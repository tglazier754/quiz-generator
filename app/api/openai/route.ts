import { NextResponse } from "@/node_modules/next/server";

import { openai } from "@/lib/openai";
import { OpenAIError } from "openai/error.mjs";


import { ChatOpenAI } from "@langchain/openai";

import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();
  //console.log("body --------");
  //console.log(body);
  console.log(body);


  try {
    /*const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body,
    });
    const theResponse = completion.choices[0].message;
    return NextResponse.json({ output: theResponse }, { status: 200 });*/

    /*const testResponse =
      { "name": "turkey breast", "calories": 135, "protein": { "value": 30, "unit": "g" }, "fats": { "total": { "value": 1, "unit": "g" }, "saturated": { "value": 0, "unit": "g" }, "trans": { "value": 0, "unit": "g" }, "polyunsaturated": { "value": 0, "unit": "g" }, "monounsaturated": { "value": 0, "unit": "g" } }, "carbohydrates": { "total": { "value": 0, "unit": "g" }, "dietary_fiber": { "value": 0, "unit": "g" }, "sugars": { "value": 0, "unit": "g" } }, "serving_size": "100g", "micronutrients": { "iron": { "value": 1.2, "unit": "mg" }, "zinc": { "value": 2.7, "unit": "mg" }, "vitamin B6": { "value": 0.7, "unit": "mg" }, "vitamin B12": { "value": 0.5, "unit": "mcg" } } }

    const theResponse = { role: 'system', content: JSON.stringify(testResponse) }*/


    const model = new ChatOpenAI({});

    const promptTemplate = PromptTemplate.fromTemplate(
      "Give me the nutrition facts for {item}"
    );

    const outputParser = new StringOutputParser();





    const chain = RunnableSequence.from([promptTemplate, model]);

    const theResponse = await chain.invoke({
      item: "banana"
    });
    console.log(theResponse);
    return NextResponse.json({ output: theResponse })
  }
  catch (error) {
    console.log(error);
    //TODO : We can send this error object to analytics or datadog/etc
    return NextResponse.json({ output: "OpenAI call unsuccessful" }, { status: 500 })

  }

}



/*
 const functionSchema = [{
      name: "nutritionFacts",
      description: "A collection of nutrition information following canada's nutrition facts label standard",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "The name of the item" },
          serving_size: { type: "string", description: "A typical serving size for this item" },
          calories: { type: "number", description: "The total Kcals for the item" },
          protein: { type: "number", description: "The amount of protein in the item, in grams" },
          fats: { type: "array", items: { type: "string" }, description: "A list of each type of fat contained in the item, each in grams" },
          carbohydrates: { type: "array", items: { type: "string" }, description: "A list of each type of carbohydrate contained in the item, each in grams" },
          micronutrients: { type: "array", items: { type: "string" }, description: "A list of each type of micronutrient (vitamin or mineral) contained in the item, each in grams" },
        },
        required: ["name", "calories", "protein", "fats", "carbohydrates", "serving_size", "micronutrients"],
      }
    }];
    */