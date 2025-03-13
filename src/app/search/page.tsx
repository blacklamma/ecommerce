import ProductCard from "@/src/components/ProductCard";
import { prisma } from "@/src/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
    searchParams: { query: string }
}

export function generateMetadata({ searchParams: { query } }: SearchPageProps): Metadata {
    return {
        title: `${query} - tEst-Commerce`
    }
}

export default async function SearchPage({ searchParams: { query } }: SearchPageProps) {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } }
            ]
        },
        orderBy: { id: "desc" }
    });
    if (products.length === 0) {
        return <div className="text-center text-2xl">No results found</div>;
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard product={product} key={product.id}></ProductCard>
            ))}
        </div>
    );

}