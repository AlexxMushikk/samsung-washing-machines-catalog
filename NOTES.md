# Development notes

Time log and issues encountered while building the test task.

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
  them using the transform values from the SVG source, converted to WebP: 108 KB total.

- JSON carries no type information, so the imported data is `string` where the
  domain types expect literal unions. Solved with one type assertion inside a single
  data module, so everything downstream stays properly typed.

- The "Sortuj po" dropdown in the mockup lists "Wszystkie / Cena / Pojemność" while
  its closed state shows "Popularność" — a value not in the list. A sort control
  always has some order, so "Wszystkie" does not apply here. Treated "Popularność"
  as the default and renamed the first option.

## Saturday 26.09

13:20–23:00 (~8h, excluding breaks)

- Value formatting utilities (price, capacity, dimensions, installment, date range)
- Product card, product grid, page layout — all styled with CSS Modules
- Extracted the filters bar into its own component and added a typed `updateFilter` helper
- Replaced the native `<select>` with a custom dropdown
- Pagination: six cards at a time, "Pokaż więcej" loads six more
- Responsive layout throughout, written mobile-first

Issues:

- The mockup includes a separate "Dropdown UI" frame showing the open state of every
  filter, which a native `<select>` cannot reproduce: its option list is rendered by the
  operating system and is out of reach of CSS. Replaced it with a custom dropdown —
  a button plus an absolutely positioned list, closing on outside click and Escape,
  with arrow keys, Enter and the usual ARIA attributes. The trade-offs are real: on
  mobile the native picker is a better experience, and keyboard support stops short of
  type-ahead, Home/End and scrolling the highlighted option into view.

- `Intl.NumberFormat('pl-PL')` formats 3199 as "3199", not "3 199" as the mockup has it.
  Polish locale data uses `min2` grouping, so a thousands separator only appears from
  five digits up. Forcing `useGrouping: 'always'` fixes it. Found by comparing the
  rendered price against the mockup digit by digit.

- Going through the layout at six viewport widths surfaced three problems that are
  invisible at desktop size: cards whose feature list is one line shorter left their
  button floating above the others (fixed by pushing it down with `margin-top: auto`);
  at 768px the longest filter label wraps to two lines and pushed its dropdown out of
  line with the other three (fixed by bottom-aligning the row); and because filtering
  changes the page height, the browser scrollbar appearing and disappearing shifted the
  whole layout sideways (fixed with `scrollbar-gutter: stable`).

## Sunday 27.09

14:00–14:40 (~40 min)

- README
- Final read-through of the whole project with fresh eyes
