import "./Testimonials.css";
import thierry from "../assets/images/thierry.webp";
import stephAmi from "../assets/images/ami.jpg";

function Testimonials() {
  return (
    <div className="testimonial-entry">
    <section id="Testimonials">
      <h2>Témoignage d'un ami photographe</h2>
      <img src={thierry} alt="t.devynck" />
<h2>Ce que disent ses amis...</h2>
      <article className="testimonials scrollable">
        Stephano, Athlète complet de la photo. La photographie est un art, qui se mue chez certains en art de vivre.
        <br />
        Stephano a fait d'elle la compagne familière de son existence,
        toujours disponible quand il s'agit de retenir la fuite des choses,<br/>
        pour en faire des collections d'images arrêtées. Parvenue à un certain degré d'assiduité,
        la pratique de la photographie tourne en mode de vie.<br/><br/>
        Cartier-Bresson tatait parfois les poches à soufflet de ses camarades.
        Des professionnels il est vrai, et leur demandait: "Où est ton Leica?"<br/>
        Je n'ai jamais vu Stephano sans un appareil à la main. En général un SYGMA, modèle un peu spécial, 
        délivrant des clichés de ce format carré, réputé si difficile à composer.
        Il a un faible pour les focales courtes.<br/>
        Quand on fait des photos comme on respire tout devient plus simple et d'abord plus rapide. 
        Pas de tâtonnement ni d'hésitation. On se trouve naturellement où il faut,<br/>
        on lève l'appareil à l'œil, le cadre et le point se font tout seuls, on déclenche,
        on double si nécessaire, et l'on continue de se déplacer vers le cadre suivant. <br/>
        Le block-Notes de Gaumont, vieux de cent dix-huit ans,
        suggérait déjà dans son nom la pratique cursive de la photographie,<br/>
        abondante et rapide, qui deviendra plus facile avec le Leica et,
        aujourd'hui plus encore avec le numérique et l'appareil photo dans le téléphone,<br/>
        ce qui donne tous les jours des milliards de clichés nuls, sans contenu ni composition,
        voués à l'oubli instantané (c'est le progrès).<br/>
        Quand on aime la photo, on se place au-dessus de la mêlée.
        Il s'agit de trouver sa propre formule esthétique et morale.<br/>
        Dans cette exigence personnelle toujours soigner la prise de vue,<br/>
        en maintenant son regard sous tension (c'est le plus difficile), pour aller vite et bien.<br/>
        Le photographe de race ne voit pas le monde extérieur comme vous et moi.<br/>
        Il est aussi un homme ordinaire, mais quand il est en mode photo, tout change, tout l'homme est mobilisé.<br/>
        "Ça ne rigole plus". Stephano fortifie ses qualités d'opérateur, qu'il tient d'instinct: <span className="voir">VOIR, CADRER JUSTE, ET DÉCLENCHER</span>, le tout en anticipant le coup suivant.<br/>
        Ce talent est rare, probable que vous ne l'avez pas, mais on ne vous le dira pas chez le marchand d'appareils.<br/><br/>
        <p className="author">Thierry Devynck.</p>
       
      </article>
       <div className="testimonial-entry2">
        <img src={stephAmi} alt="Didier Scudéroni" className="photo" />
        <article className="testimonials scrollable">
          <p>
            Une de mes photos (en noir et blanc sur l'affiche) fait le tour du monde !!! 🌍<br />
            Superbe expo en Chine de mon ami DiDou ! (alias Didier Scuderoni), grand artiste, je suis fier de lui… Merci !
          </p>
          <p className="author">Stephano</p>
        </article>
      </div>
      
    </section>
     </div>
  );
}

export default Testimonials;
