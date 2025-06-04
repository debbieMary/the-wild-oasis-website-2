import { getCabins } from '../_lib/data-service';
import CabinCard from './CabinCard'

export default async function CabinList({filter}) {

      // CHANGE
  const cabins = await getCabins();
let displayedCabins = cabins;
  //if(!cabins.length) return null;

  if(filter === 'all') {
displayedCabins = cabins;
  }
  if(filter === 'small') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity < 3);
  }

  if(filter === 'medium') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  }

   if(filter === 'large') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  if (!cabins || cabins.length === 0) {
    return <p>No cabins available</p>;
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displayedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
  )
}
