'use server';

import crypto from 'crypto';
import config from '@root/lib/config';
import knex from '@root/lib/db';
import { v4 as uuid } from 'uuid';
import { handle } from './errors';
import { UploadClient } from '@uploadcare/upload-client'

const client = new UploadClient({ publicKey: config.uploadcare.publicKey })

async function fileToBuffer(file) {
  const buffer = await file.arrayBuffer();
  return Buffer.from(buffer);
}

async function createChecksum(buffer) {
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  return hash;
}

export async function uploadImage(file) {
  const buffer = await fileToBuffer(file);
  const checksum = await createChecksum(buffer);
  const existing = await knex.select('id', 'url').from('images').where('checksum', checksum).first();
  if (existing) return existing;
  const res = await handle(client.uploadFile(buffer, { fileName: file.name }));
  const id = uuid();
  await handle(knex.insert({ id, url: res?.data?.cdnUrl, checksum }).into('images'));
  return { id, url: res?.data?.cdnUrl };
}

