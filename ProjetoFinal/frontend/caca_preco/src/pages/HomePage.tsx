import Menu from "@/components/menu";
import CardProduct from "@/components/CardProduct";
import BottomMenu from "@/components/BottomMenu";
import styles from "../styles/HomePage.module.css"

export default function HomePage (){
    return(
        <>
            <Menu />
            <section className={styles.produts_container}>
                <CardProduct
                    pathImg="arroz_urbano.jpeg"
                    name="Comercial Dia a dia"
                    description="Arroz urbano 5kg"
                    price="R$ 25,50"
                    starRank={4.5}
                    verifiedCount={10}
                    location="São Paulo, SP"
                />
                
                <CardProduct
                    pathImg="arroz_urbano.jpeg"
                    name="Comercial Dia a dia"
                    description="Arroz urbano 5kg"
                    price="R$ 25,50"
                    starRank={4.5}
                    verifiedCount={10}
                    location="São Paulo, SP"
                />
                <CardProduct
                    pathImg="arroz_urbano.jpeg"
                    name="Comercial Dia a dia"
                    description="Arroz urbano 5kg"
                    price="R$ 25,50"
                    starRank={4.5}
                    verifiedCount={10}
                    location="São Paulo, SP"
                />
                <CardProduct
                    pathImg="arroz_urbano.jpeg"
                    name="Comercial Dia a dia"
                    description="Arroz urbano 5kg"
                    price="R$ 25,50"
                    starRank={4.5}
                    verifiedCount={10}
                    location="São Paulo, SP"
                />
                <CardProduct
                    pathImg="arroz_urbano.jpeg"
                    name="Comercial Dia a dia"
                    description="Arroz urbano 5kg"
                    price="R$ 25,50"
                    starRank={4.5}
                    verifiedCount={10}
                    location="São Paulo, SP"
                />
            </section>
            <BottomMenu></BottomMenu>
        </>
    );
}