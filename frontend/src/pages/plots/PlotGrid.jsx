import { useEffect, useState } from "react";
import { getPlots } from "../../api/plot.api";

const statusColor = {
  available: "bg-green-500",
  hold: "bg-yellow-400",
  booked: "bg-blue-500",
  sold_out: "bg-red-500"
};

const PlotGrid = ({ project_id }) => {
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    getPlots({ project_id }).then(res => {
      setPlots(res.data.plots);
    });
  }, [project_id]);

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">Plot Map</h2>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">

        {plots.map((plot) => (
          <div
            key={plot.id}
            className={`h-16 flex flex-col justify-center items-center text-white text-xs rounded cursor-pointer hover:scale-105 transition ${statusColor[plot.status]}`}
          >
            <p className="font-semibold">{plot.plot_number}</p>
            <p>{plot.dimension_sqft} sqft</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default PlotGrid;