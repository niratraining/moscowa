import { demoHotels, priceLabel } from "@/data/demo";
import { HotelResultCard } from "@/components/hotels/HotelResultCard";
import { ResultsShell } from "./ResultsShell";

export function HotelResultsDemo() {
  return (
    <ResultsShell
      title="هتل‌های پیشنهادی"
      resultCount={demoHotels.length}
      sortOptions={[
        { id: "recommended", label: "پیشنهادی" },
        { id: "score", label: "بالاترین امتیاز" },
        { id: "price", label: "ارزان‌ترین" },
      ]}
      filterGroups={[
        {
          id: "stars",
          title: "ستاره هتل",
          options: [
            { id: "5", label: "۵ ستاره", count: 2 },
            { id: "4", label: "۴ ستاره", count: 2 },
          ],
        },
        {
          id: "board",
          title: "وعده غذایی",
          options: [
            { id: "breakfast", label: "با صبحانه", count: 3 },
            { id: "room", label: "فقط اقامت", count: 1 },
          ],
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        {demoHotels.map((hotel) => (
          <HotelResultCard
            key={hotel.id}
            href={`/hotels/${hotel.id}`}
            name={hotel.name}
            city={hotel.city}
            stars={hotel.stars}
            board={hotel.board}
            tags={hotel.tags}
            image={hotel.image}
            priceLabel={priceLabel(hotel.priceFrom)}
            score={hotel.score}
            reviews={hotel.reviews}
          />
        ))}
      </div>
    </ResultsShell>
  );
}
