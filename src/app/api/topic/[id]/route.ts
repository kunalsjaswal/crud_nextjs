import { NextResponse } from "next/server";
import { Topic } from "../../../../../models/topic";
import connectMongooDB from "../../../../../libs/mongodb";

export const DELETE = async (_request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params; // Await the params object

    if (!id) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          message: "Topic ID is required",
        },
        { status: 400 }
      );
    }

    await connectMongooDB();

    const topic = await Topic.findByIdAndDelete(id);
    if (!topic) {
      return NextResponse.json(
        {
          status: 404,
          data: null,
          message: "Topic not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        data: null,
        message: "Topic deleted successfully",
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

export const PUT = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params; // Await the params object
    const { title, description } = await request.json();
    await connectMongooDB();

    const topic = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!topic) {
      return NextResponse.json(
        {
          status: 404,
          data: null,
          message: "Topic not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        data: topic,
        message: "Topic updated successfully",
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

export const GET = async (_request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params; // Await the params object

    if (!id) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          message: "Topic ID is required",
        },
        { status: 400 }
      );
    }

    await connectMongooDB();

    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json(
        {
          status: 404,
          data: null,
          message: "Topic not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        data: topic,
        message: "Topic fetched successfully",
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