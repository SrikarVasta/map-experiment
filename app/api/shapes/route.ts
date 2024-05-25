import { NextResponse } from "next/server";

let shapes = {
  shapes: [
    {
      type: "Box",
      coordinates: [
        [
          [-11501426.905550756, 5336279.674956961],
          [-10983566.038918687, 5336279.674956961],
          [-10983566.038918687, 5837477.269422861],
          [-11501426.905550756, 5837477.269422861],
          [-11501426.905550756, 5336279.674956961],
        ],
      ],
    },
    {
      type: "Star",
      coordinates: [
        [
          [-11719176.889878154, 4742344.85592407],
          [-11409702.19705963, 5061495.338564506],
          [-11011956.846255068, 4862924.817141766],
          [-11133611.925442489, 5290513.004271211],
          [-10762772.134045392, 5535685.321593745],
          [-11193901.906051338, 5644123.026082754],
          [-11220807.465458803, 6087865.864828028],
          [-11530282.158277325, 5768715.382187592],
          [-11928027.509081887, 5967285.903610332],
          [-11806372.429894468, 5539697.716480887],
          [-12177212.221291564, 5294525.399158353],
          [-11746082.449285619, 5186087.694669344],
          [-11719176.889878154, 4742344.85592407],
        ],
      ],
    },
  ],
}; // In-memory storage for demonstration purposes

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(shapes);
  } else if (req.method === "POST") {
    const newShape = req.body;
    shapes.push(newShape);
    res.status(201).json(newShape);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function GET() {
  return NextResponse.json({
    shapes,
  });
}

export async function POST(req: Request) {
  const data = await req.json();
  shapes.push(data);
  console.log(shapes);
  return NextResponse.json({
    shapes,
  });
}
