import FormSubmitButton from "@/src/components/FormSubmitButton";
import { prisma } from "@/src/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { authOptions } from "@/src/lib/auth";

export const metadata = {
    title: "Add Product - tEst-Commerce"
}

async function addProduct(formData: FormData) {
    "use server";


    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price') || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }
    await prisma.product.create({
        data: { name, description, imageUrl, price }
    })

    redirect("/");
}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }
    return (
        <div>
            <h1 className="text-lg mb-3">Add Product</h1>
            <form action={addProduct}>
                <input
                    required
                    name="name"
                    placeholder="Name"
                    className="input-bordered input mb-2 w-full"></input>
                <textarea
                    required
                    name="description"
                    placeholder="Description"
                    className="textarea-bordered textarea mb-2 w-full"></textarea>
                <input
                    required
                    name="imageUrl"
                    placeholder="Image Url"
                    type="url"
                    className="input-bordered input mb-2 w-full"></input>
                <input
                    required
                    name="price"
                    placeholder="Price"
                    type="number"
                    className="input-bordered input mb-2 w-full"></input>
                <FormSubmitButton className="btn-block">ADD</FormSubmitButton>
            </form>

        </div>
    );
}