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
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { GiEmptyHourglass } from "react-icons/gi";
import { Tabs, rem } from "@mantine/core";
// import {
//   IconPhoto,
//   IconMessageCircle,
//   IconSettings,
// } from "@tabler/icons-react";
import { Loader } from "@mantine/core";

const Home = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [blogId, setBlogId] = useState(null);
  const [ans, setAns] = useState(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
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
        <Loader color="violet" type="bars" />;
      </div>
    );
  }

  const categoryHandler = (e, id) => {
    e.preventDefault();
    setBlogId(id);
    const results = detail
      ?.filter((d) => {
        if (blogId === null) {
          return d;
        } else if (d.BlogId === blogId) {
          return detail;
        }
      })
      ?.map((d) => {
        return (
          <div
            key={d?.BlogDetailId}
            className=" flex cursor-pointer border border-gray-400  bg-black text-white hover:bg-zinc-900"
          >
            <span className=" w-20 h-16 flex justify-center items-center select-none">
              {d?.BlogDetailId}
            </span>
            <span className="w-full h-16 flex justify-start items-center px-3 select-none">
              {d?.BlogContent}
            </span>
          </div>
        );
      });
    console.log("results", ans);
    setAns(results);
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
          <span className=" w-20 h-16 flex justify-center items-center select-none">
            {d?.BlogDetailId}
          </span>
          <span className="w-full h-16 flex justify-start items-center px-3 select-none">
            {d?.BlogContent}
          </span>
        </div>
      );
    });

  return (
    <div className="container mx-auto h-screen p-5">
      <Tabs defaultValue="search" className="mb-10">
        <Tabs.List>
          <Tabs.Tab
            value="search"
            // leftSection={<IconPhoto style={iconStyle} />}
          >
            Search
          </Tabs.Tab>
          <Tabs.Tab
            value="category"
            // leftSection={<IconMessageCircle style={iconStyle} />}
          >
            By Category
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="search">
          <>
            <input
              type="text"
              className="w-full h-10 p-5 border-2 border-black rounded-lg mb-5"
              variant="filled"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <div className=" h-[550px] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-300 border border-black mb-5">
              {rows}
            </div>
          </>
        </Tabs.Panel>

        <Tabs.Panel value="category">
          <>
            <div className="w-fit flex flex-wrap mx-auto mb-5">
              {header?.map((h) => {
                return (
                  <button
                    key={h?.BlogId}
                    onClick={(e) => categoryHandler(e, h?.BlogId)}
                    className="w-10 h-10 font-semibold text-xl bg-black text-white hover:bg-zinc-900 border border-white"
                  >
                    {h?.BlogTitle.substring(2, 3)}
                  </button>
                );
              })}
            </div>
            <div className=" h-[550px] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-300 border border-black mb-5">{ans}</div>
          </>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Home;
