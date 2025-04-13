import { NextResponse } from "next/server";
import connectMongooDB from "../../../../libs/mongodb";
import { Topic } from "../../../../models/topic";

export const POST = async (request: Request) => {
  try {
    const { title, description } = await request.json();

    await connectMongooDB();

    await Topic.create({ title, description });

    return NextResponse.json(
      {
        message: "Topic created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectMongooDB();
    const topics = await Topic.find();
    return NextResponse.json(
      {
        status: 200,
        data: {
          count: topics.length,
          topics,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: 500,
        data: null,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
