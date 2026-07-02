# PflegeCommunity

Die größte digitale Community für Pflegeschüler — Fragen stellen, Wissen teilen, gemeinsam lernen.
Mehrsprachig (Deutsch / English / العربية · RTL), im Stil von Reddit/Stack Overflow, aber
komplett auf Pflegeausbildung zugeschnitten.

## Stack

- **Frontend:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS
- **Backend:** Supabase (Postgres + Auth + Realtime + Storage), über Row Level Security abgesichert
- **Hosting:** Vercel (empfohlen) + Supabase Cloud

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Werte aus deinem Supabase-Projekt eintragen
npm run dev
```

Öffne `http://localhost:3000` — du wirst automatisch auf `/de` (Standardsprache) weitergeleitet.

## Supabase einrichten

1. Neues Projekt auf [supabase.com](https://supabase.com) anlegen.
2. **SQL Editor** → Inhalt von `supabase/schema.sql` ausführen. Das legt alle Tabellen, Trigger,
   Row-Level-Security-Policies und die Standardkategorien an.
3. **Authentication → Providers** → Google aktivieren (für "Mit Google fortfahren") und die
   Redirect-URL `https://DEINE-DOMAIN/auth/callback` eintragen (lokal zusätzlich
   `http://localhost:3000/auth/callback`).
4. **Storage** → Bucket `attachments` (public) anlegen — wird für PDF-/Bild-Uploads an Fragen und
   Antworten verwendet (Tabelle `attachments` ist bereits vorbereitet).
5. **Project Settings → API** → `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` und
   `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` eintragen.
6. Ersten Admin ernennen: nach der Registrierung in der Tabelle `profiles`
   `role` auf `admin` setzen (SQL Editor oder Table Editor).

## Projektstruktur

```
src/
  app/[lang]/            Alle Seiten, pro Sprache geroutet (de/en/ar)
    page.tsx             Startseite / Feed (mit Vitals-Strip)
    ask/                 Frage stellen
    post/[id]/           Fragen-Detailseite mit Antworten
    category/[slug]/     Kategorie-Feed
    profile/[username]/  Öffentliches Profil
    leaderboard/         Bestenliste
    login/, signup/       Auth (E-Mail + Google OAuth)
    admin/                Verwaltung (nur moderator/admin, serverseitig geprüft)
  app/auth/callback/     OAuth-Redirect-Handler
  components/            UI-Bausteine (Navbar, PostCard, VoteControl, ...)
  i18n/                  Wörterbücher de.json / en.json / ar.json + Loader
  lib/supabase/          Browser-, Server- und Admin-(Service-Role)-Clients
  middleware.ts          Spracherkennung/-redirect + Supabase-Session-Refresh
supabase/schema.sql       Komplettes Datenbankschema, RLS-Policies, Seed-Daten
```

## Design

Ruhige, klinische Farbpalette (Tiefes Klinik-Grün `#1D6F5C` auf warmem Off-White `#F7F9F8`,
Bernstein-Akzent `#E8A33D` für Hervorhebungen), Serif-Headline (Fraunces) kombiniert mit Inter für
Fließtext und IBM Plex Mono für "Messwerte" (Punkte, Statistiken) — angelehnt an die Vitalzeichen-
Kurven, die Pflegeschüler von der Station kennen. Vollständiger Dark Mode über die `dark:`-Klassen
in `tailwind.config.ts`. Arabisch schaltet automatisch auf RTL-Layout (`dir="rtl"` in
`app/[lang]/layout.tsx`, logische `ms-`/`me-`/`ps-`/`pe-`-Klassen im ganzen UI).

## Bereits implementiert

- Konten via E-Mail/Passwort oder Google, automatisches Profil bei Registrierung
- Fragen erstellen, Kategorien, Upvote/Downvote für Fragen & Antworten, Kommentare (Schema),
  beste Antwort markieren
- Punkte- und Levelsystem (automatisch per DB-Trigger bei jedem Vote/Accept), Bestenliste, Badges (Schema)
- Echtzeit-Benachrichtigungen (Supabase Realtime) bei neuen Antworten
- Volltextsuche (Titel + Text)
- Admin-Bereich: Dashboard, Nutzer sperren/entsperren, Meldungen bearbeiten, Kategorienübersicht
- Row Level Security auf allen Tabellen — jede Schreiboperation ist serverseitig abgesichert,
  nicht nur im UI versteckt

## Als Nächstes ausbauen

Die Datenbank ist für folgende Features bereits vorbereitet (Tabellen existieren, UI kann ergänzt
werden): private Nachrichten (`messages`), Datei-Uploads zu Fragen/Antworten (`attachments` +
Storage-Bucket), Aktivitätsverlauf auf Profilen (`activity_log`), Badge-Vergabe-Logik
(`badges`/`user_badges` — aktuell nur Anzeige, Vergabe-Trigger fehlt noch), Kommentare unter
Antworten (`comments`-Tabelle + RLS stehen, UI-Thread fehlt noch).

Für eine native App später: Die Datenschicht (Supabase) ist plattformunabhängig — ein React
Native/Expo- oder Flutter-Client kann dieselbe Datenbank und denselben Auth-Flow wiederverwenden,
ohne das Backend zu ändern.
