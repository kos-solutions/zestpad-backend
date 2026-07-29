# zestpad-backend — arhivat

Acest repo nu mai este întreținut. Codul rămâne aici doar ca istoric.

**Aplicația activă:** https://github.com/kos-solutions/zestpad-web

## Ce s-a întâmplat

Backend-ul NestJS de aici și frontend-ul Vite din `zestpad-web` au fost
consolidate într-o singură aplicație Next.js. Infrastructura a scăzut de la
două servicii (Railway pentru API + Vercel pentru frontend) la unul singur
(Vercel), iar Railway a rămas doar gazdă de Postgres.

## De ce

Versiunea aceasta rula **Prisma și TypeORM în paralel** pe aceeași bază de
date, cu convenții diferite de denumire a tabelelor. Rezultatul, constatat în
baza de producție înainte de migrare:

| Create de Prisma | Create de TypeORM |
|---|---|
| `User` — 0 rânduri | `users` — 1 rând |
| `Class` — 0 rânduri | `classes` — 2 rânduri |
| `Topic` — 0 rânduri | `topics` — 2 rânduri |
| `Lesson` — 0 rânduri | `lessons` — 1 rând |

Aplicația scria prin TypeORM în tabelele cu litere mici, în timp ce migrările
Prisma creau în paralel tabele goale cu majusculă. Asta explica erorile de
deploy.

Alte probleme corectate în noua versiune:

- lipsea complet verificarea de autorizare — orice utilizator autentificat
  putea citi și scrie în orice clasă
- `synchronize: true` era activ în producție, modificând schema la fiecare
  pornire
- `CORS origin: '*'`
- token-ul de sesiune era ținut în `localStorage`
- `POST /classes/join` era apelat de frontend, dar nu exista în backend

## Dacă ai nevoie de codul vechi

Rămâne în istoricul acestui repo. Versiunea Vite a frontend-ului e păstrată
pe ramura `backup-vite` din `zestpad-web`.
