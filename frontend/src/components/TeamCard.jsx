import React from "react";

const TeamCard = ({ name, description, members }) => {
  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl border transition-all duration-200 bg-base-200 border-base-300 hover:border-base-content/20 hover:shadow-md ">
      <div>{name}</div>
      <div>
        <p className="text-base-content/60 leading-relaxed">{description}</p>
        <div className="flex justify-end border-t border-base-300 ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              {members.length < 2
                ? `${members.length} member`
                : `${members.length} members`}
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-lg"
            >
              <div className="">
                {members.map((m) => {
                  return <div className="m-1">{m.user.name}</div>;
                })}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
