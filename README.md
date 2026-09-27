# Samsung washing machine catalogue

Frontend test task for Cheil Poland — a product catalogue rebuilt from the Figma
mockup, with a search field, four filters that work simultaneously, sorting and
paginated results. Interface language is Polish; the code and data are in English.

## Running it

```bash
npm install
npm run dev
```

Other scripts: `build`, `preview`, `lint`, `format`.

## Stack

- React 19 + Vite
- TypeScript
- CSS Modules
- No UI or state library

## Structure

```
src/
  types/        domain types — Product, FilterState, SortOption
  data/         products.json and a typed module that loads it
  constants/    Polish labels, product image map
  utils/        filtering, sorting, value formatting — pure functions, no React
  hooks/        useProductFilters — filter state and the derived product list
  components/
    ui/         Select — reusable, knows nothing about products
    catalog/    FiltersBar, ProductGrid, ProductCard, ShowMoreButton
```

The filtering and sorting logic lives in plain functions that take data and return
data. They can be read on their own and called from anywhere, and the components
above them only deal with rendering.

## How filtering works

`filterProducts` applies four checks in sequence, each narrowing the result of the
previous one:

```
search → feature → energy class → capacity
```

Every filter has the same shape: if it is set to `'all'` the step is skipped entirely,
otherwise the list is narrowed. The sorted, filtered list is derived state computed in
a `useMemo` — it is never stored in `useState` and never synchronised with an effect,
so there is no way for it to fall out of step with the filters.

Filter options are derived from the catalogue rather than hard-coded, so the choices
offered can never disagree with the data.

## Decisions worth explaining

**The font.** SamsungOne is proprietary, so Inter is used as the closest free
substitute, with SamsungOne first in the stack.

**"Sortuj po" in the mockup is inconsistent.** Its option list reads
"Wszystkie / Cena / Pojemność" while the closed state shows "Popularność" — a value
that is not in the list. Unlike the other three controls, a sort order always has some
value, so "Wszystkie" does not apply here. "Popularność" is treated as the default and
the first option is named accordingly.

**Sort direction is fixed.** The mockup has no control for it: popularity descending,
price ascending (what a catalogue shopper expects), capacity descending.

**The dropdowns are custom, not native.** The mockup includes a "Dropdown UI" frame
showing the open state, which a native `<select>` cannot reproduce — its option list is
drawn by the OS. The replacement closes on outside click and Escape, supports arrow
keys and Enter, and carries the matching ARIA attributes.

**Product data.** 23 machines in `src/data/products.json`. Three of the model names
come from the mockup, the rest follow Samsung's naming scheme. Prices, capacities,
energy classes and feature sets are deliberately varied so that every filter and every
sort order has something to act on. Field names are English; Polish appears only in the
interface, through `constants/labels.ts`.

**Images.** Exported from Figma and converted to WebP — 108 KB for all three.

**One type assertion.** JSON carries no type information, so the imported data arrives
as `string` where the domain types expect literal unions. The assertion is made once, in
`src/data/products.ts`, and everything downstream is properly typed.

**Selection.** One product at a time, as the title "Wybierz urządzenie" implies.
Clicking a selected card clears it; the selection survives filtering.

Development notes, including a time log and the problems hit along the way, are in
[NOTES.md](NOTES.md).
