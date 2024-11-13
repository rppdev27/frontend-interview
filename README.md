# Frontend Interview BitWyre

Implement either 1 of the 1-3 challenge assignments. Please fork this repo and share it with us.

# TypeScript Test

Candidate must use typescript to complete challenges below.

## General Expectations

For the assignments, we expect candidates to:

- **Write clean, readable, and efficient** TypeScript code.

- **Don’t overuse features** provided by the standard library.

- **Don’t overcomplicate** the code.

- Organize the code into **well-defined components** and adhere to TypeScript best practices, using strong typing and modular organization.

- Follow the **TypeScript coding guidelines** and aim to make the code scalable and maintainable.

- Use modern TypeScript features, including **generics and advanced typing** where necessary.

- **Apply performance optimization techniques** and, if relevant, use Web Workers or other methods to handle computationally heavy tasks in a frontend environment.

## Challenges Base Criteria

- **All challenges below must be dockerized**: Make sure the frontend can be run in a container environment.

- **All challenges below must implement** light / dark mode without any glitch when moving into different parts of the website / tab.

- **All challenges below must consider browser behavior**: Make sure the platform runs smoothly on multiple browsers (Firefox, Chrome, Microsoft Edge, Opera, etc).

- **All challenges below must have error handling**: Any unexpected result must be handled, this will include failed to fetch data or data fetch failed when  mid-scrolling (Implement Retry Mechanism), and empty data handling.

## 1. Video Streaming Platform

Design and implement interface for video streaming platform which have core functionality and these criteria:

1. Search:

- Implement debouncing to avoid excessive requests.

2. Filter:

- Implement multiple filtering so the user can filter videos by category, uploader.

3. Sorting:

- Implement sort by views, likes, and upload date.
    
    ****For search, filter, and sorting, implement an infinite scroll feature or “Load More” feature.**

4. Must Have Feature:

- Implement pre-loading video (thumbnail).

- Add to favorites, retain the user data so it remains available for future visits unless the user clears the browser data.


## 2. E-Commerce Platform

Design and implement interface for E-Commerce platform which have core functionality and these criteria:

1. Search:

- Implement debouncing to avoid excessive requests.

2. Filter:

- Implement multiple filtering so the user can filter items by category, seller, price range, availability (Available or Out of Stock), and rating.

3. Sorting:

- Implement sort by price high to low or low to high, recommended seller, and rating.

    ****For search, filter, and sorting, implement an infinite scroll feature or “Load More” feature.**

4. Must Have Feature:

- Implement pre-loading video for products with video.

- Add to cart feature, retain the user data so it remains available for future visits unless the user clears the browser data.

## 3. Crypto Tracker Website

Design and implement interface for Crypto Tracker Website which have core functionality and these criteria:

1. Search:

- Implement debouncing to avoid excessive requests.

2. Filter:

- Implement multiple filtering so the user can filter crypto by category such as AI / Memes / Solana Eco / ETH Eco, market cap, top gainer, and top loser.

3. Sorting:

- Implement sort by ticker name, market cap, 24h volume, 1h% price change, 24h% price change, 7d% price change, and circulating supply.

    ****For search, filter, and sorting, implement an infinite scroll feature or “Load More” feature.**

4. Must Have Feature:

- Implement web scraping, give some list of crypto news.

- Add to favorites, retain the user data so it remains available for future visits unless the user clears the browser data.

# Cryptocurrency Test

1. Explain what you know about layer 1 and layer 2. Use ELI5 to explain this.

2. Explain this scenario, a user wants to withdraw Arbitrum using Arbitrum One Network from exchange A to exchange B but the user has a mistake copy paste the Ethereum Main Net address deposit instead of Arbitrum One Network address deposit, what will happen? Say our exchange is the exchange B as a receiver, list all possibilities for this scenario and how will you as a frontend displaying the user balance regarding this scenario?

3. Explain this transaction hash, include the details. 
    
    - https://mantlescan.xyz/tx/0xd43ce2aa598a75d9595a2c2779e5bf4b0375eef72a69c6d8e2b0bf5f676c66af 

4. Explain about the funding fee on exchange, how it works, and how you will as a frontend displaying this to the user?

5. What is network congestion? As a frontend, how will you display this to the user?

6. Why do you want to work for Bitwyre?
