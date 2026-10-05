import type { RecipeRepository } from '../ports/recipe-repository.port';
import type { RecipeSnapshot } from '../core/models';
import { sampleSnapshot } from '../core/recipe-engine';
const KEY = 'c2c-003-information-recipe';
export class LocalRecipeRepository implements RecipeRepository {
  load(): RecipeSnapshot {
    try {
      const value = localStorage.getItem(KEY);
      if (value) {
        const snapshot = JSON.parse(value) as Partial<RecipeSnapshot>;
        return { entries: Array.isArray(snapshot.entries) ? snapshot.entries : [], readingList: Array.isArray(snapshot.readingList) ? snapshot.readingList : [], dailyGoal: typeof snapshot.dailyGoal === 'number' ? snapshot.dailyGoal : sampleSnapshot().dailyGoal };
      }
    } catch { /* use seed */ }
    return sampleSnapshot();
  }
  save(snapshot: RecipeSnapshot) { localStorage.setItem(KEY, JSON.stringify(snapshot)); }
}
