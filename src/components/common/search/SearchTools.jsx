import { Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { setRankingProfile } from "../../../state/search";

export function SearchTools() {
  const dispatch = useDispatch();
  const ranking = useSelector((state) => state.search.ranking);
  function onChange(e) {
    dispatch(setRankingProfile(e.target.value));
  }

  return (
    <div id="search-tools">
      <Space>
        <Radio.Group
          name="r"
          size="small"
          defaultValue={ranking}
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
