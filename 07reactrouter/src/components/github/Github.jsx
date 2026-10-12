import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
//   const [data, setData] = useState([]);
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="text-center m-4 bg-gray-400 text-white text-3xl">
      Github Followers : {data.followers}
      <img src={data.avatar_url} width={300} />
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch(
    "https://api.github.com/users/hiteshchoudhary"
  ).then((response) => response.json());

  return response;
};
