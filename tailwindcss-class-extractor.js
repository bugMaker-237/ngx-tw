module.exports = (content) => {
  // Regular class and twClass attributes (with both quote types)
  const classMatches = content.match(/class=["']([^"']+)["']/g) || [];
  const twClassMatches = content.match(/twClass=["']([^"']+)["']/g) || [];

  // Angular specific patterns
  const ngClassMatches = content.match(/ngClass=["']([^"']+)["']/g) || [];
  const ngClassBindingObjects =
    content.match(/\[ngClass\]=["']\{[^}]*\}["']/g) || [];
  const ngClassBindingArrays =
    content.match(/\[ngClass\]=["']\[[^\]]*\]["']/g) || [];

  // Angular property binding for classes - extract the class name
  const classBindingMatches =
    content.match(/\[class\.([a-zA-Z0-9_-]+)\]/g) || [];
  const classBindings = classBindingMatches.map((match) => {
    // Extract just the class name from [class.some-class]
    return match.match(/\[class\.([a-zA-Z0-9_-]+)\]/)[1];
  });

  // Process regular attributes
  const classes = classMatches.map((match) =>
    match.replace(/class=["']/, "").replace(/["']$/, "")
  );

  const twClasses = twClassMatches.map((match) =>
    match.replace(/twClass=["']/, "").replace(/["']$/, "")
  );

  const ngClasses = ngClassMatches.map((match) =>
    match.replace(/ngClass=["']/, "").replace(/["']$/, "")
  );

  // Extract classes from the binding object syntax
  // This is simplified - full parsing would be more complex
  const objectBindingClasses = ngClassBindingObjects.flatMap((match) => {
    const objectContent = match.match(/\{([^}]*)\}/)?.[1] || "";
    return objectContent
      .split(",")
      .map((pair) => pair.split(":")[0].trim().replace(/['"]/g, ""))
      .filter(Boolean);
  });

  // Extract classes from array binding syntax
  const arrayBindingClasses = ngClassBindingArrays.flatMap((match) => {
    const arrayContent = match.match(/\[([^\]]*)\]/)?.[1] || "";
    return arrayContent
      .split(",")
      .map((item) => item.trim().replace(/['"]/g, ""))
      .filter(Boolean);
  });

  // Combine all sources and split by whitespace
  return [
    ...classes,
    ...twClasses,
    ...ngClasses,
    ...objectBindingClasses,
    ...arrayBindingClasses,
    ...classBindings,
  ]
    .flatMap((str) => str.split(/\s+/))
    .filter(Boolean);
};
