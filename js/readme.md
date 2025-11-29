# DECI client library

version : Alpha

## Establish connection with LCP ( Local Cache Process )

```
import { deci } from "deci";

// Connect 
deci.connect({
  socket: "/tmp/lcp.sock",
  pool: 10
});

```

## CRUD

### LCP queries

```
await deci.set({ key: "Name", value : "Amigo" });
await deci.get({ key: "Name" });
await deci.del({ key: "Name" });
await deci.exists({ key: "Name" });

```

### GCP queries

```
await deci.gset({ key: "Name", value : "Global Amigo" });
await deci.gget({ key: "Name" });
await deci.gdel({ key: "Name" });
await deci.gexists({ key: "Name" });

```

### Disabling LCP sync for a particular query ( SET / DEL )

```
await deci.set({ key: "Name", value : "Amigo", sync: false });
```


