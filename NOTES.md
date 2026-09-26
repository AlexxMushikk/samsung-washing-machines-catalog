## Thursday 24.09

21:38–00:32 (~3h)

- Project setup: Vite + React + TS, ESLint, Prettier
- Cleaned Vite boilerplate, set up design tokens from Figma
- Read TS Handbook: Everyday Types

Issues:

- Vite react-ts template ships without "strict" in tsconfig — added manually

## Friday 25.09

15:12–22:20 (~7h)

- Domain types, Polish feature labels, 23 products in JSON
- Product images extracted from Figma and converted
- Filtering and sorting as pure functions, filter state hook
- Working page with all filters and sorting, no styling yet

Issues:

- Designing the domain types took the most deliberation. Deciding what should be a
  literal union (energy class, feature codes) and what a plain `number` (capacity),
  and separating the cases where the compiler needs to be given a type
  (`useState<FilterState>`) from those where it has to be told to stop checking —
  those choices shape everything downstream, so they were worth getting right
  before writing any logic.

- Exporting product photos from Figma as SVG produced base64-encoded PNGs wrapped
  in `<svg>` — 2.3 MB for images shown at 200x200. Extracted the bitmaps, cropped
  them using the transform values from the SVG source, converted to WebP: 59 KB total.

- JSON carries no type information, so the imported data is `string` where the
  domain types expect literal unions. Solved with one type assertion inside a single
  data module, so everything downstream stays properly typed.

- The "Sortuj po" dropdown in the mockup lists "Wszystkie / Cena / Pojemność" while
  its closed state shows "Popularność" — a value not in the list. A sort control
  always has some order, so "Wszystkie" does not apply here. Treated "Popularność"
  as the default and renamed the first option.
