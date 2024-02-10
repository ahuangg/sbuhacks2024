'use client'

import SearchBar from "@/components/section-components/searchbar"
import axios from "axios";
import React from "react"

export default function IndexPage() {
    const sendDataToFlask = () => {
      try {
        fetch('http://localhost:8080/response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ variable: "give me an outfit for an interview" }),
        }).then(res => res.json)
        .then(
          data => {
            console.log("shouldve returned something")
            console.log(data)
          }
        );
      } catch (error) {
        console.error('Error sending data to Flask:', error);
      }
    };

  return (
    <section className="container h-full after:gap-6 pb-8 pt-6 md:py-10 ">
      <div className="h-[90%]"></div>
      <div className="flex justify-bottom">
        <SearchBar />
      </div>
      <button onClick={sendDataToFlask}>Click ME</button>
    </section>
  )
}
