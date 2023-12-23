import { Radio, Space } from "antd";
import { useContext } from "react";

import { SearchContext } from "../../logic/search";
import { useSearchParams } from "react-router-dom";

export function SearchTools() {
  const search = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  function onChange(e) {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set("r", e.target.value);
    newParams.set("page", 1);
    setSearchParams(newParams);
  }

  return (
    <div id="search-tools">
      <Space>
        <Radio.Group
          name="r"
          size="small"
          defaultValue={search.options.srqiprofile}
          onChange={onChange}
        >
          <Radio.Button value="engine_autoselect">Default ranking</Radio.Button>
          <Radio.Button value="popular_inclinks_pv">
            Popular (views)
          </Radio.Button>
          <Radio.Button value="popular_inclinks">Links</Radio.Button>
        </Radio.Group>
      </Space>
    </div>
  );
}
