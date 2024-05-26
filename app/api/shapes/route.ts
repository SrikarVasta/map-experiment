import { NextResponse } from "next/server";

const url = process.env.GEO_DATA_SERVER_URI;

//Test data incase server doesn't work
// let shapes = [
//   {
//     id: 2,
//     type: "Star",
//     coordinates: [
//       [
//         [-10941774.093703765, 5849726.30320556],
//         [-11110422.173675667, 5695935.26857105],
//         [-11307984.428768573, 5810228.8054608],
//         [-11259121.525886746, 5587279.766588408],
//         [-11456883.759868097, 5473332.603293886],
//         [-11239372.777014365, 5404174.599056004],
//         [-11239572.755902812, 5175933.898871732],
//         [-11070924.67593091, 5329724.933506242],
//         [-10873362.420838006, 5215431.3966164915],
//         [-10922225.323719831, 5438380.435488884],
//         [-10724463.08973848, 5552327.5987834055],
//         [-10941974.072592212, 5621485.603021287],
//         [-10941774.093703765, 5849726.30320556],
//       ],
//     ],
//   },
// ];

export async function GET() {
  const getURL = `${url}/shape/`;
  console.log(`GET: ${getURL}`);
  const res = await await fetch(getURL, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  const newShapes = await res.json();
  return NextResponse.json({
    shapes: newShapes,
  });
}

const postShapes = async (shape) => {
  const postURL = `${url}/shape/add`;
  console.log(`POST: ${postURL}`);
  const res = await fetch(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shape),
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
};

export async function POST(req: Request) {
  const data = await req.json();
  // shapes.push(data);
  await postShapes(data);
  return NextResponse.json({
    data,
  });
}
