import React, { useEffect, useState } from "react";
import {
  useGetBlogHeaderQuery,
  useGetBlogDetailQuery,
} from "../redux/api/dreamApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogHeader,
  addBlogDetail,
  setSearchTerm,
} from "../redux/services/dreamSlice";
import { GiEmptyHourglass } from "react-icons/gi";

const Home = () => {
  const [show, setShow] = useState("all");
  const [ans, setAns] = useState(null);
  const dispatch = useDispatch();
  const { data: dreamHeader } = useGetBlogHeaderQuery();
  const { data: dreamDetail, isLoading } = useGetBlogDetailQuery();
  const header = useSelector((state) => state.dreamSlice.blogHeader);
  const detail = useSelector((state) => state.dreamSlice.blogDetail);
  const searchTerm = useSelector((state) => state.dreamSlice.searchTerm);

  useEffect(() => {
    dispatch(addBlogHeader(dreamHeader));
  }, [dreamHeader]);
  useEffect(() => {
    dispatch(addBlogDetail(dreamDetail));
  }, [dreamDetail]);

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center w-screen h-screen">
        <GiEmptyHourglass className=" animate-spin mr-2" size={'2rem'}/>
        <p className=" font-semibold text-2xl text-center animate-plus	">Loading...</p>
      </div>
    );
  }

  const categoryHandler = async (e, id) => {
    e.preventDefault();
    setAns(null);
    const results = await detail
      ?.filter((d) => {
        if (d.BlogId === id) {
          return detail;
        }
      })
      ?.map((d) => {
        return (
          <div
            key={d?.BlogDetailId}
            className=" flex cursor-pointer border border-gray-400  bg-black text-white hover:bg-zinc-900"
          >
            <span className="w-full py-3 md:h-16 flex justify-start items-center px-3 select-none sm:text-[12px] text-[16px]">
              {d?.BlogContent}
            </span>
          </div>
        );
      });
    setAns(results);
    console.log("results", ans);
    setShow("category");

  };

  const rows = detail
    ?.filter((d) => {
      if (searchTerm === "") {
        return d;
      } else if (d.BlogContent.includes(searchTerm)) {
        return detail;
      }
    })
    ?.map((d) => {
      return (
        <div
          key={d?.BlogDetailId}
          className=" flex cursor-pointer border border-gray-400  bg-black text-white hover:bg-zinc-900"
        >
          {/* <span className=" w-20 h-16 flex justify-center items-center select-none">
            {d?.BlogDetailId}
          </span> */}
          <span className="w-full py-3 flex justify-start items-center px-3 select-none sm:text-sm">
            {d?.BlogContent}
          </span>
        </div>
      );
    });

  return (
    <div className="container mx-auto h-screen px-5 py-6">
      <p className=" font-bold text-3xl text-center mb-6">Dream Dictionary</p>
      <input
        onFocus={() => setShow("all")}
        type="text"
        className="w-full h-10 p-5 border-2 border-black rounded-lg mb-6"
        variant="filled"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <div className="w-fit flex flex-wrap justify-center items-center mx-auto mb-6">
        {header?.map((h) => {
          return (
            <button
              key={h?.BlogId}
              onClick={(e) => categoryHandler(e, h?.BlogId)}
              className="w-10 h-10 flex justify-center items-center font-semibold text-xl bg-black text-white hover:bg-zinc-900 border border-white"
            >
              {h?.BlogTitle.substring(2, 3)}
            </button>
          );
        })}
      </div>
      <div className="bg-zinc-700 h-[80%] xl:h-[65%] 2xl:h-[80%] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-300 mb-6">
        {show === "all" ? rows : null}
        {show === "category" ? ans : null}
      </div>
    </div>
  );
};

export default Home;
