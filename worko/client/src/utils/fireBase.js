// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  type: "service_account",
  project_id: "worko-3c889",
  private_key_id: "cc93cf157ebca8acdf33c6105a74e431e85b35b7",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbUkgsYQy+JbI4\n0vtv3ST3EYSVJltoumHq+qQPGghytwbEOcENYhWRnNqtEKlKEXEoGyUEMVorLJrm\nfBHMy600ITNrRHcCnsQyf7GchZ2l4US1dFUSuVABuJC+M2WIYyKe4Y4XVXen6q+m\nTD9WHT1zjkMFdmH27EgJ4WK6tTIWw6QVGQqMSZNlcOCHsrMhQUjj3RRU/oGoKXm9\nzBQmDHVXDTVKCna7ISP4mP3oUhQiLw0W2SAB9KODomxGWAUXBD3IMOdHY5glDmNl\n8f3ghZOl6saUz74Sd/Tf5lcoWkZjNjgOlh+C1fJlJjZ6ckb/IRK01jIoeHARKq8q\nP1EFISfNAgMBAAECggEAB3HBCmSW6qNb68rZhwACH7LEBc4B/0mIRlIQnISdMcud\nmq59K4efRMyGraYpoN57sUlOldhY/6spbNZcQk/Nhr3zwVnXEksyTKaB8Famtbky\nPFiBBLwuh4hsvVAAS8NVqv/r80XO5G+2W5Yt9i3S5qe3BanxhFCb114DnGPHGfek\n86hX0TXXxVm0uyFQ0PPau7cI89BVVitfiSXqc6G2IPSgkltaJ7Yl7xLvDHFOSW3e\nDBtgqNVWk05FJhHggke2/CFrHYpwE6GhFCo1FE5kyNcl0sqAnLrPDH0EovZKVbcp\nG3ifBzA02v1B3eeYw9H1dAKtytpadAlL78boSrNSTwKBgQD0fB/gkyr1fItDfEyD\np3EvNFhV4f9e40FGQ2U+//gxeWgV38oP+0Q9hHPru7dirrYf6PB2SE0lmgNbFx8Z\nXf7vUPxucCSL7luutmdTb2y3ABIJ0wpQaVjBoPYEV2Tq5ueRSZQBckTShLfiOKFl\nbngEFm+Af2NGasyo+rMVZodq0wKBgQDlpr/MZ8Cnje1fQ6s9qFgMYrpaWGE518Gf\n/3/otQzBOnycVqOLDO7WFiNUpfmcBM2hK6xjCmJz/7whbfBo+LFhlknKnH2jieDx\n0WaAfil7Fr/50KMHq9XcYdvEWNI5IgahZzCrD+gt1iz6padf4I8h10tFBPV62lsI\n/yx6CgQ+3wKBgELmGB7uhknIO59KyvEXh1wgWa+eeK9xRfJBDNpRVovLKdUaeIMp\nAUJIFSRDKGojXoiax/nFzP5mB1cMm6DoXJMFuR1LKGT14zaKiPmGutvUdBsmGWNp\ngDTzo34Kn/27E1BpLsu6heSJFnwbfOZxdPvBW99wfCzPmpL+jrRjatirAoGAJQdA\n761e8+U/e9fGWZe2MrEMiRqs+o2eS7T/o77lgpZylyalEfuQ2vYQ1ko4t/5SRYVs\nMz/uZfO7GszGMba/qxN3bHLVEzRdD8CKvXcaKx2c8KPCVa9QOUuSCtOjedDRrt6b\ni0lyT0m0UOm61gu4KGW1XjiReDCS8x1px3er/ZMCgYEAiqhdidw7A3xuTjPV/Un3\n4GKRjugHuv7fYlqGT+Ocl4UD7fAGxKdyLrkzNUYx36nklBw5GCgj/goA8FMiDAy/\n7MzhG6xboYi4gVSIO63ocgMHGUFKAuPNIKreWD9EV9lIQHjzjqnVGTBa1Xvn/+BW\nZZuLYO0tagLw+QxVOOUHsrg=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@worko-3c889.iam.gserviceaccount.com",
  client_id: "101073930413603564502",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40worko-3c889.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
