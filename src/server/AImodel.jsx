import { GoogleGenerativeAI } from "@google/generative-ai";



const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


 export const chatSession = model.startChat({
    generationConfig,
 
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel plan for location: Los Angeles, USA, for 3 Days for 2 People with a Moderate budget, give me Hotels options list with Hotel Name, Hotel address, Price, hotel image URL ,geo coordinates, rating, description and suggest itinerary with placename, place details, place Image Url,Geo coordinates, ticket pricing, Time travel each of location for 2 days with each day plan with best time to visit in JSON format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"name\": \"The Hoxton, Downtown LA\",\n      \"address\": \"405 S Main St, Los Angeles, CA 90013\",\n      \"price\": \"From $200 per night\",\n      \"imageUrl\": \"https://images.trvl-media.com/media/content/hotels/2146795/e5149b50-9067-4a51-9b27-00c6d9257255.jpg\",\n      \"geoCoordinates\": \"34.0495,-118.2439\",\n      \"rating\": 4.5,\n      \"description\": \"Stylish and modern hotel in the heart of Downtown LA, close to attractions like Grand Central Market and Walt Disney Concert Hall.\"\n    },\n    {\n      \"name\": \"The Roosevelt Hotel\",\n      \"address\": \"700 S Flower St, Los Angeles, CA 90017\",\n      \"price\": \"From $250 per night\",\n      \"imageUrl\": \"https://images.trvl-media.com/media/content/hotels/179025/1d677176-8371-4e96-b901-f2289252580a.jpg\",\n      \"geoCoordinates\": \"34.0522,-118.2437\",\n      \"rating\": 4,\n      \"description\": \"Historic Hollywood hotel with a glamorous vibe, featuring a rooftop pool and bar.\"\n    },\n    {\n      \"name\": \"The Ace Hotel, Downtown LA\",\n      \"address\": \"929 S Broadway, Los Angeles, CA 90015\",\n      \"price\": \"From $180 per night\",\n      \"imageUrl\": \"https://images.trvl-media.com/media/content/hotels/101983/1270e260-549a-49d8-b07b-77a6c21809db.jpg\",\n      \"geoCoordinates\": \"34.0477,-118.2498\",\n      \"rating\": 4.2,\n      \"description\": \"Hip and trendy hotel with a focus on design and art, located near the LA Live entertainment complex.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"morning\": {\n        \"name\": \"Griffith Observatory\",\n        \"details\": \"Explore the iconic Griffith Observatory and enjoy breathtaking views of Los Angeles.\",\n        \"imageUrl\": \"https://www.laalmanac.com/images/stories/laalmanac/news/2016/07/griffith_observatory.jpg\",\n        \"geoCoordinates\": \"34.1399,-118.2483\",\n        \"ticketPricing\": \"Free admission\",\n        \"time\": \"9:00 AM - 12:00 PM\"\n      },\n      \"afternoon\": {\n        \"name\": \"Hollywood Walk of Fame\",\n        \"details\": \"Stroll along the famous Hollywood Walk of Fame and search for your favorite stars' names.\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Hollywood_Walk_of_Fame_%282010%29.jpg/1280px-Hollywood_Walk_of_Fame_%282010%29.jpg\",\n        \"geoCoordinates\": \"34.0900,-118.3267\",\n        \"ticketPricing\": \"Free\",\n        \"time\": \"1:00 PM - 4:00 PM\"\n      },\n      \"evening\": {\n        \"name\": \"Sunset Strip\",\n        \"details\": \"Enjoy dinner and drinks on the vibrant Sunset Strip, famous for its nightlife and music venues.\",\n        \"imageUrl\": \"https://www.sunsetstrip.com/uploads/uploads/SunsetStrip_5.jpg\",\n        \"geoCoordinates\": \"34.0897,-118.3529\",\n        \"ticketPricing\": \"Varies by restaurant and venue\",\n        \"time\": \"6:00 PM - 9:00 PM\"\n      }\n    },\n    \"day2\": {\n      \"morning\": {\n        \"name\": \"Santa Monica Pier\",\n        \"details\": \"Spend the morning on the iconic Santa Monica Pier, riding the Ferris wheel and enjoying the amusement park.\",\n        \"imageUrl\": \"https://www.santamonicapier.org/sites/default/files/styles/full_width/public/2021-06/Santa-Monica-Pier-Photo-17.jpg?itok=4nLqB0_G\",\n        \"geoCoordinates\": \"34.0136,-118.4904\",\n        \"ticketPricing\": \"Varies by attraction\",\n        \"time\": \"9:00 AM - 12:00 PM\"\n      },\n      \"afternoon\": {\n        \"name\": \"Getty Center\",\n        \"details\": \"Visit the Getty Center, a world-renowned art museum with stunning architecture and gardens.\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Getty_Center_Aerial_View.jpg/1280px-Getty_Center_Aerial_View.jpg\",\n        \"geoCoordinates\": \"34.0522,-118.4404\",\n        \"ticketPricing\": \"Free admission, parking fee\",\n        \"time\": \"1:00 PM - 4:00 PM\"\n      },\n      \"evening\": {\n        \"name\": \"Grand Central Market\",\n        \"details\": \"Explore the historic Grand Central Market, a vibrant food hall with diverse culinary options.\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Grand_Central_Market_Los_Angeles_%282019%29.jpg/1280px-Grand_Central_Market_Los_Angeles_%282019%29.jpg\",\n        \"geoCoordinates\": \"34.0520,-118.2435\",\n        \"ticketPricing\": \"Free\",\n        \"time\": \"6:00 PM - 9:00 PM\"\n      }\n    },\n    \"day3\": {\n      \"morning\": {\n        \"name\": \"LACMA (Los Angeles County Museum of Art)\",\n        \"details\": \"Explore a vast collection of art from around the world at the Los Angeles County Museum of Art.\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/LACMA_Los_Angeles_County_Museum_of_Art_%282018%29.jpg/1280px-LACMA_Los_Angeles_County_Museum_of_Art_%282018%29.jpg\",\n        \"geoCoordinates\": \"34.0637,-118.2432\",\n        \"ticketPricing\": \"Varies by exhibition\",\n        \"time\": \"9:00 AM - 12:00 PM\"\n      },\n      \"afternoon\": {\n        \"name\": \"The Broad\",\n        \"details\": \"Visit The Broad, a contemporary art museum featuring a diverse collection of modern and contemporary art.\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/The_Broad_museum_exterior.jpg/1280px-The_Broad_museum_exterior.jpg\",\n        \"geoCoordinates\": \"34.0462,-118.2487\",\n        \"ticketPricing\": \"Free with timed-entry reservations\",\n        \"time\": \"1:00 PM - 4:00 PM\"\n      },\n      \"evening\": {\n        \"name\": \"Downtown LA\",\n        \"details\": \"Enjoy dinner and drinks in Downtown LA, exploring its vibrant nightlife and entertainment scene.\",\n        \"imageUrl\": \"https://www.visitcalifornia.com/sites/default/files/styles/large_thumbnail/public/images/article-hero/downtown-la.jpg?itok=q_7s8a8Z\",\n        \"geoCoordinates\": \"34.0522,-118.2437\",\n        \"ticketPricing\": \"Varies by restaurant and venue\",\n        \"time\": \"6:00 PM - 9:00 PM\"\n      }\n    }\n  }\n}\n```\n\n**Please note:**\n\n* This itinerary is just a suggestion, and you can customize it based on your interests and preferences.\n* Hotel prices are approximate and can vary depending on the time of year and availability.\n* Ticket prices can also vary, so it's always a good idea to check the official websites for the most up-to-date information.\n* Be sure to factor in transportation costs when planning your budget.\n* You can find more information about these locations and other attractions in Los Angeles on the official tourism website or travel blogs.\n"},
        ],
      },
    ],
  });

 