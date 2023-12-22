import { Radio, Space } from "antd";
import { useContext } from "react";

import { SearchResultsContext } from "../../logic/search";

export function SearchTools() {
  const results = useContext(SearchResultsContext);

  return (
    <div id="search-tools">
      <Space>
        <Radio.Group
          name="srwhat"
          size="small"
          defaultValue={results.options.srwhat}
        >
          <Radio.Button value="nearmatch">Standard</Radio.Button>
          <Radio.Button value="text">Exact</Radio.Button>
          <Radio.Button value="title">Titles</Radio.Button>
        </Radio.Group>
        <Radio.Group
          name="srprofile"
          size="small"
          defaultValue={results.options.srprofile}
        >
          <Radio.Button value="classic">Default ranking</Radio.Button>
          <Radio.Button value="popular_inclinks_pv">
            Popular (views)
          </Radio.Button>
          <Radio.Button value="popular_inclinks">Links</Radio.Button>
        </Radio.Group>
      </Space>
    </div>
  );
}
