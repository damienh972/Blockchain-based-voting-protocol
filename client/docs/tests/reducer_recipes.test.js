import { expect } from 'chai';

import reducerRecipes from '../../src/reducers/recipes';

import { saveRecipes, SAVE_RECIPES } from '../../src/actions/recipes';

// only (sur describe ou sur it) permet d'exécuter seulement ce bloc/cas de test,
// les autres sont ignorés (=> bien penser à l'enlever quand on a fini de mettre au
// point les tests)
// describe.only('reducer for recipes', () => {
describe('reducer for recipes', () => {
  it('is a function', () => {
    expect(reducerRecipes).to.be.a('function');
  });

  // skip (sur describe ou it) permet d'ignorer le bloc/cas de test
  // it.skip('test initial state', () => {
  it('test initial state', () => {
    // on appelle le reducer sans argument pour obtenir le state initial
    // console.log(reducerRecipes()); // affiche l'état initial

    const expectedState = {
      listRecipes: [],
      loading: true,
    };

    // "deep" comparaison en profondeur : on ne veut pas comparer les références des
    // objet, on veut comparer les propriétés à l'intérieur
    expect(reducerRecipes()).to.deep.equal(expectedState);
  });

  // tester si on fournit une action SAVE_RECIPES
  it('check treatment of action SAVE_RECIPES', () => {
    // on déclare un faux state
    const stateBefore = {
      listRecipes: [],
      loading: true,
    };

    // fausses recettes à utiliser en payload de l'action
    const recipes = [
      {
        id: 12345,
        title: 'Crêpes raffinées',
        thumbnail: 'https://images.pexels.com/photos/53483/strawberries-crepe-dessert-sweet-53483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        id: 8965,
        title: 'Pizza Margherita',
        thumbnail: 'https://images.pexels.com/photos/263041/pexels-photo-263041.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ];

    // on crée une action de type SAVE_RECIPES
    const action = saveRecipes(recipes);

    // on calcule le résultat attendu en sortie du reducer
    const expectedState = {
      ...stateBefore,
      listRecipes: recipes,
      loading: false,
    };

    // on appelle le reducer avec state et action => on vérifie le state en retour
    const stateAfter = reducerRecipes(stateBefore, action);
    expect(stateAfter).to.deep.equal(expectedState);

    // console.log(stateAfter);
  });
});
