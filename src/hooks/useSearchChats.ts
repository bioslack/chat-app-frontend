import { useState, useEffect, useRef } from "react";
import { AxiosRequestConfig } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
import Chat from "../models/Chat";
import { debounce } from "lodash";
import useSocket from "./useSocket";

const useSearchChats = (search: string, page: number) => {
  const { socket } = useSocket();
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const oldSearchRef = useRef("");
  const axios = useAxiosPrivate();

  const searchChats = async (
    search: string,
    page: number,
    options: AxiosRequestConfig
  ) => {
    return axios.get(`/chats?search=${search}&page=${page}`, options);
  };

  const debouncedSearchChats = useRef(
    debounce(
      async (search: string, page: number, options: AxiosRequestConfig) => {
        try {
          setIsLoading(true);
          setError(undefined);
          const newer = (await searchChats(search, page, options)).data.chats;

          if (oldSearchRef.current !== search) {
            setChats(newer);
            oldSearchRef.current = search;
          } else {
            setChats((prev) => [...prev, ...newer]);
          }
          setHasNextPage(Boolean(newer.length));
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(true);
        }
      },
      300
    )
  ).current;

  useEffect(() => {
    const controller = new AbortController();

    const pageNum = oldSearchRef.current !== search ? 1 : page;

    debouncedSearchChats(search, pageNum, { signal: controller.signal });

    return () => controller.abort();
  }, [search, page]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  return { chats, isLoading, hasNextPage, error };
};

export default useSearchChats;
