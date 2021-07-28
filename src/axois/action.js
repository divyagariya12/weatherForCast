// actions
export const pass = (type, json) => {
  return {
    type: type,
    payload: json,
  };
};

export const say = type => {
  return {
    type: type,
  };
};
