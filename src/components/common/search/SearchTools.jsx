import { Radio, Space } from "antd";
import { useContext } from "react";

import { SearchContext } from "../../logic/search";

export function SearchTools() {
  const search = useContext(SearchContext);

  return (
    <div id="search-tools">
      <Space>
        <Radio.Group
          name="srqiprofile"
          size="small"
          defaultValue={search.options.srqiprofile}
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
