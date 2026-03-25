import { Suspense } from "react";
import { SearchResultsClient } from "./search-results-client";

function SearchFallback(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-transparent pt-40 px-6">
      <p className="font-label text-xs uppercase tracking-widest text-white/25 text-center">
        Loading search…
      </p>
    </div>
  );
}

export default function SearchPage(): React.JSX.Element {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResultsClient />
    </Suspense>
  );
}
