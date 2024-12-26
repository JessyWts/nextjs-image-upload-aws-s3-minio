import { NextResponse } from "next/server";

export const GET = async (request: Request, context: any) => {
  try {
    const params = await context.params;
    const imageId = params.imageId;

    return NextResponse.json({
      imageId: imageId,
    });
  } catch (error) {
    return new NextResponse("Error in get image" + error, { status: 500 });
  }
};

// Test
// url http://localhost:3000/api/images/xyz?imageId=23
// export const GET = async (req: NextRequest) => {
//   try {
//     const params: URLSearchParams = req.nextUrl.searchParams;
//     const imageId = params.get("imageId");

//     if (imageId) {
//       return NextResponse.json({
//         imageId: imageId,
//       });
//     } else {
//       return NextResponse.json({
//         message: "No imageId provided",
//       });
//     }
//   } catch (error) {
//     return NextResponse.json({
//       error: error,
//     });
//   }
// };
