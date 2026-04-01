import React from "react";

const ROLE_CONFIG = {
  OWNER: {
    label: "Owner",
    classes: "bg-red-500/10 text-red-400 border border-red-500/20",
  },
  ADMIN: {
    label: "Admin",
    classes: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  },
  MEMBER: {
    label: "Member",
    classes: "bg-green-500/10 text-green-400 border border-green-500/20",
  },
};
const ROLE_ORDER = { OWNER: 0, ADMIN: 1, MEMBER: 2 };

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
                {[...members]
                  .sort(
                    (a, b) =>
                      (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99),
                  )
                  .map((m) => {
                    const roleconfig = ROLE_CONFIG[m.role] ?? {};
                    return (
                      <div key={m.id} className="m-1 flex gap-2">
                        <section className={roleconfig.classes}>
                          {roleconfig.label}
                        </section>
                        <section>{m.user.name}</section>
                      </div>
                    );
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
