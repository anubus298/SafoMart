"use client";
import { Skeleton } from "antd";
function productCard({ num }) {
  return (
    <div className="flex justify-between w-full p-2 select-none bg-main">
      {num.map((item, index) => {
        return (
          <div
            className="flex justify-center h-[380px] select-none"
            key={index * 2 + index * 3 + index}
          >
            <div className="w-full mx-5 sm:mx-0 sm:w-[300px] bg-secondarySecondarylight  h-full md:rounded-lg p-5">
              <div className="flex justify-center h-[180px] items-center">
                <Skeleton.Image active={true} loading={true} />
              </div>
              <div className="h-[0.5px] bg-gray-300 w-full  "></div>
              <div className="h-[100px] overflow-hidden flex items-center justify-center text-center">
                <Skeleton loading={true}>
                  <h4 style={{ marginBottom: 16 }}>Product name</h4>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsam consequuntur maiores unde placeat accusantium
                    perferendis voluptas a. Beatae ad voluptatum eius a
                    architecto. Minima qui
                  </p>
                </Skeleton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default productCard;
