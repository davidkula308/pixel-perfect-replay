<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Company settings live in src/lib/site.ts and the service catalogue in src/lib/services.ts; pages read from these so the content can later move to a database without changing the pages.
- Services and career packages share the catalogue and dynamic detail/order flow; category filters use validated URL search so navigation and direct links stay consistent.
