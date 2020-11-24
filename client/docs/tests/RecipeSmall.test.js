import React from 'react';

/*
shallow permet de faire un rendu d'un composant, sans faire le rendu des
sous-composants (chacun sa responsabilité). On peut tester le contenu HTML, simuler
des clics...
https://enzymejs.github.io/enzyme/docs/api/shallow.html
*/
import { shallow } from 'enzyme';

import { expect } from 'chai';

// on importe Link parce qu'on en a besoin pour le test
import { Link } from 'react-router-dom';

// import du composant à tester
import RecipeSmall from '../../src/components/Home/RecipeSmall';

describe('<RecipeSmall />', () => {
  it('Uses information given as props', () => {
    const testTitle = 'PizzA au FroMage';
    // on prépare le slug de ce titre
    const slug = 'pizza-au-fromage';
    // on pourrait construire en utilisant slugifyTitle(testTitle);

    const wrapper = shallow(<RecipeSmall title={testTitle} thumbnail="pizza.png" difficulty="Facile" />);

    // vérifier qu'il y a bien un h2 avec la valeur de la prop dedans
    const elementsH2 = wrapper.find('h2');
    // je vérifie que j'ai bien un et un seul h2
    expect(elementsH2).to.have.lengthOf(1);
    // je vérifie le contenu => un seul élément, pas besoin de [0]
    expect(elementsH2.text()).to.equal(testTitle);

    // vérifier qu'on a bien un Link avec la bonne valeur pour sa prop to
    const linkComponents = wrapper.find(Link);
    expect(linkComponents).to.have.lengthOf(1);
    // vérification de la prop => un seul élément, pas besoin de [0]
    // est-ce que l'objet props a bien une propriété to qui vaut /recipe + slugify
    // sur le titre de la recette
    expect(linkComponents.props()).to.have.property('to', `/recipe/${slug}`);

    // TODO vérifier aussi que thumbnail est utilisé pour src sur l'image
  });
});
