import {
  algorithmCardItemsByCategory,
  navigationConfig,
} from "@/config/navigation";
import { AlgorithmCardItem } from "@/types/navigation";

const algorithmRoot = navigationConfig.mainNavItems.find(
  (item) => item.href === "/algorithms",
);

const getNavigationItems = (categoryPath: string) =>
  algorithmRoot?.children?.find((item) => item.href === categoryPath)
    ?.children ?? [];

export const createCategoryAlgorithms = (
  categoryPath: string,
): AlgorithmCardItem[] => {
  const featuredAlgorithms = algorithmCardItemsByCategory[categoryPath] ?? [];
  const featuredByPath = new Map(
    featuredAlgorithms.map((algorithm) => [algorithm.path, algorithm]),
  );

  const navigationAlgorithms = getNavigationItems(categoryPath).map((item) => {
    const featured = featuredByPath.get(item.href);

    if (featured) {
      return featured;
    }

    return {
      name: item.label,
      path: item.href,
      description:
        item.description ??
        `${item.label} algoritması için hazırlanan sayfayı inceleyin.`,
      difficulty: item.difficulty,
      category: item.category,
    };
  });

  const navigationPaths = new Set(
    navigationAlgorithms.map((algorithm) => algorithm.path),
  );
  const remainingFeaturedAlgorithms = featuredAlgorithms.filter(
    (algorithm) => !navigationPaths.has(algorithm.path),
  );

  return [...navigationAlgorithms, ...remainingFeaturedAlgorithms];
};
