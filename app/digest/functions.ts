import { convert } from "html-to-text";


import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";
import { basicQuizPrompt, formatConversion, websiteSummaryPrompt } from "../../utils/prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";

import {
    RunnableSequence,
    RunnablePassthrough,
} from "@langchain/core/runnables";


export async function generateQuizData(url?: string | string[] | undefined) {

    //TODO: ensure the provided path is a valid url

    if (url && typeof url === "string") {
        //pull the html data of the provided url
        const response = await fetch(url);
        const data = await response.text();

        //cleanse the data so that we don't have all the html boilerplate
        const converted = convert(data, {
            selectors: [
                { selector: 'main' },
                { selector: 'a', format: 'skip' },
                { selector: 'img', format: 'skip' },
                { selector: 'input', format: 'skip' },
                { selector: 'form', format: 'skip' },
                { selector: 'iframe', format: 'skip' },
            ]
        });

        //initialize the open ai model
        const model = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0
        });


        console.log(typeof converted);
        console.log("----***----");
        console.log(converted);
        console.log("----***----")
        //convert html content to vector store

        const QUIZ_GENERATION_PROMPT = PromptTemplate.fromTemplate(basicQuizPrompt);
        const QUIZ_REFORMAT_PROMPT = PromptTemplate.fromTemplate(formatConversion);
        const WEBSITE_SUMMARY_PROMPT = PromptTemplate.fromTemplate(websiteSummaryPrompt)

        //run the cleansed data through the prompt 

        const quizGenerationChain = RunnableSequence.from([
            {
                content: (input) => input.content,
            },
            QUIZ_GENERATION_PROMPT,
            model,
            new StringOutputParser()
        ]);

        const quizFormatChain = RunnableSequence.from([
            {
                quiz: (new RunnablePassthrough()),
            },
            QUIZ_REFORMAT_PROMPT,
            model,
            new JsonOutputParser()
        ]);

        const initialQuizGeneratorInvocation = await quizGenerationChain.invoke({
            content: converted
        })

        //generate a summary of the webiste

        const websiteSummaryChain = RunnableSequence.from([
            {
                content: (input) => input.content,
            },
            WEBSITE_SUMMARY_PROMPT,
            model,
            new StringOutputParser()
        ]);



        console.log("initialQuizGeneratorInvocation")
        console.log(initialQuizGeneratorInvocation);

        const formattedQuiz = await quizFormatChain.invoke(
            initialQuizGeneratorInvocation
        );

        const websiteSummaryInvocation = await websiteSummaryChain.invoke({
            content: converted
        })

        const result = { summary: websiteSummaryInvocation, quiz: formattedQuiz }

        console.log("formattedResult")
        console.log(result);



        return result;
    }

}

////***************   TEST DATA 

/*

const summary = "**Lesson: Understanding Server-Side Rendering (SSR) in Next.js**

**1. Definition of SSR:**
- Server-Side Rendering (SSR) is a web development technique where HTML for a web page is generated on the server before being sent to the client's browser. This contrasts with Client-Side Rendering (CSR), where the browser loads a minimal HTML file and fetches content using JavaScript.

**2. How SSR Works in Next.js:**
- In Next.js, SSR is integrated through a file-based routing system and special lifecycle methods. When a user requests a page, Next.js renders it on the server, including any necessary data fetching. The pre-rendered HTML is sent to the client, improving load times.

**3. Example of SSR in Next.js:**
- A simple example demonstrates the use of `getServerSideProps`, a function that runs on the server for each request, fetching data and passing it as props to the component.

```javascript
// pages/index.js
import React from 'react';

const HomePage = ({ serverRenderedData }) => {
  return (
    <div>
      <h1>Welcome to Next.js SSR!</h1>
      <p>{serverRenderedData}</p>
    </div>
  );
};

export async function getServerSideProps() {
  const serverRenderedData = 'Data fetched on the server';
  return {
    props: {
      serverRenderedData,
    },
  };
}

export default HomePage;
```

**4. SSR in Next.js 13 and Above:**
- In Next.js 13, server components are introduced. A component can be defined as a server component by default, which runs on the server. To create a client-side component, the `"use client"` directive is used.

**5. Data Fetching in Server Components:**
- In Next.js 13, data can be fetched directly in server components using async/await without the need for `useEffect` or `useState`. However, to handle loading and error states, separate `loading.jsx` and `error.jsx` files can be created.

**6. Benefits of SSR in Next.js:**
- **Improved Performance:** Reduces time to first byte (TTFB) and enhances page load speed.
- **SEO Friendliness:** Provides pre-rendered HTML, improving discoverability by search engines.
- **Enhanced User Experience:** Offers faster initial page loads and a more responsive experience.
- **Maintainability and Consistency:** Centralizes data fetching on the server, promoting cleaner code and consistency between server-rendered and client-rendered content.

**Conclusion:**
Understanding and implementing SSR in Next.js can significantly enhance web application performance, SEO, and user experience. Developers are encouraged to leverage SSR in their projects to optimize application performance."

const formattedResult = {
            questions: [
                'What is the primary purpose of a page in the context of App Router?',
                'The `searchParams` object contains values that can be known ahead of time.',
                'The `params` object in the `Page` function contains information from the ______ segment down to that page.',
                'What is the significance of the `searchParams` object in the context of a page?',
                'In which version was the `page` feature introduced?',
                'The `searchParams` returns a URLSearchParams instance.',
                'Provide an example of how the `params` object might look for the URL `/shop/1/2`.',
                'Which of the following is NOT a valid way to define a route in the App Router?'
            ],
            answers: [
                'To serve as UI that is unique to a route',
                'False',
                'root',
                'The `searchParams` object allows the page to access query parameters from the current URL, which can change dynamically at request time.',
                'v13.0.0',
                'False',
                "The `params` object might look like `{ category: '1', item: '2' }` for the URL `/shop/1/2`.",
                '`/app/shop/page.js` - This does not follow the parameterized route structure.'
            ]
        }
        
*/