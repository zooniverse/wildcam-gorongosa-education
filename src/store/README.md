# Redux Store

Actions are available by importing `store/actions`, which returns an object built of the other actions files in the directory. This means you can import action methods by doing:

```
import { fetchClassrooms } from '../../store/actions';
```

...so you don't have to know exactly which file the action is in.
