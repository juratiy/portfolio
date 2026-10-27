import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { MAX_FILE_BYTES, MAX_IMAGES, MAX_TOTAL_BYTES, imageType } from './project-data.ts';
import { PortfolioError } from './portfolio-service.ts';
import { supabaseConfig, supabaseRequest, objectPath, bucketName } from './supabase.ts';

type Ticket = { key: string; userId: string; mime: string; size: number; expires: number };
function signature(payload: string) { return createHmac('sha256', supabaseConfig().key).update(payload).digest('base64url'); }
export function readTicket(value: string, userId: string): Ticket {
  const [payload, mac, extra] = value.split('.');
  if (!payload || !mac || extra) throw new PortfolioError('Invalid upload ticket.');
  const expected = signature(payload), actual = Buffer.from(mac);
  if (actual.length !== expected.length || !timingSafeEqual(actual, Buffer.from(expected))) throw new PortfolioError('Invalid upload ticket.');
  const ticket = JSON.parse(Buffer.from(payload, 'base64url').toString()) as Ticket;
  if (ticket.userId !== userId || ticket.expires < Date.now()) throw new PortfolioError('Upload expired. Please select the images again.');
  return ticket;
}

export async function prepareUploads(files: { type: string; size: number }[], userId: string) {
  if (!Array.isArray(files) || !files.length || files.length > MAX_IMAGES) throw new PortfolioError('Choose between 1 and 6 images.');
  if (files.some(f => !f || !Number.isSafeInteger(f.size) || f.size <= 0 || f.size > MAX_FILE_BYTES || !['image/png','image/jpeg','image/webp'].includes(f.type))) throw new PortfolioError('Use PNG, JPEG or WebP images up to 8 MB each.');
  if (files.reduce((n,f) => n + f.size, 0) > MAX_TOTAL_BYTES) throw new PortfolioError('Keep the total upload under 24 MB.', 413);
  const uploads = [];
  for (const file of files) {
    const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
    const key = `staging/${randomUUID()}.${extension}`;
    const response = await supabaseRequest(`/storage/v1/object/upload/sign/${bucketName}/${key}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    const result = await response.json() as { url: string };
    const ticket: Ticket = { key, userId, mime: file.type, size: file.size, expires: Date.now() + 30 * 60_000 };
    const payload = Buffer.from(JSON.stringify(ticket)).toString('base64url');
    uploads.push({ url: `${supabaseConfig().url}/storage/v1${result.url}`, ticket: `${payload}.${signature(payload)}` });
  }
  return uploads;
}

export async function resolveUploads(values: string[], userId: string) {
  if (!Array.isArray(values) || values.length > MAX_IMAGES || values.some(v => typeof v !== 'string' || v.length > 2048)) throw new PortfolioError('Invalid uploads.');
  const tickets = values.map(value => readTicket(value, userId));
  if (tickets.reduce((n,t) => n + t.size, 0) > MAX_TOTAL_BYTES) throw new PortfolioError('Keep the total upload under 24 MB.', 413);
  const files = [];
  for (const ticket of tickets) {
    const response = await supabaseRequest(objectPath(ticket.key));
    // Bound memory even if a signed upload URL was used with a different size.
    const reader = response.body!.getReader();
    const chunks: Uint8Array<ArrayBuffer>[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > ticket.size || size > MAX_FILE_BYTES) { await reader.cancel(); throw new PortfolioError('Uploaded image size does not match.', 413); }
      chunks.push(new Uint8Array(value));
    }
    const file = new File(chunks, 'render', { type: ticket.mime });
    if (size !== ticket.size || imageType(new Uint8Array(await file.slice(0,12).arrayBuffer()))?.mime !== ticket.mime) throw new PortfolioError('Upload a valid PNG, JPEG or WebP image.');
    files.push(file);
  }
  return { files, keys: tickets.map(t => t.key) };
}
