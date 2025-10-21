import http from '@/lib/api';

export async function fetchMedia() {
  const { data } = await http.get('/library');
  return data;
}
