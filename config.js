System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "reqwest": "github:ded/reqwest@^1.1.5",
    "npm:assertion-error@1.0.0": {},
    "npm:chai@1.9.2": {
      "assertion-error": "npm:assertion-error@1.0.0",
      "deep-eql": "npm:deep-eql@0.1.3",
      "json": "npm:json@^9.0.2"
    },
    "npm:deep-eql@0.1.3": {
      "type-detect": "npm:type-detect@0.1.1"
    },
    "npm:json@9.0.2": {},
    "npm:type-detect@0.1.1": {}
  }
});

System.config({
  "versions": {
    "github:ded/reqwest": "1.1.5",
    "github:jspm/nodelibs": "0.0.5",
    "npm:assertion-error": "1.0.0",
    "npm:deep-eql": "0.1.3",
    "npm:json": "9.0.2",
    "npm:type-detect": "0.1.1"
  }
});

