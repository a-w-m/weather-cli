const testForCity = code => {
    return code() === process.argv[2] ? true : false;
  };