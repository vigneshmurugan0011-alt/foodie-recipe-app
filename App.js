
import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Image, Pressable,
  StyleSheet, SafeAreaView, Alert, StatusBar
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CATEGORIES = [
  'All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks',
  'Desserts', 'Vegetarian', 'Vegan', 'Italian',
  'Indian', 'Healthy', 'My Food'
];

const INITIAL_RECIPES = [
  { id: '1', name: 'Masala Dosa', category: 'Breakfast', time: 25, servings: 2, calories: 320, difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=700', ingredients: ['2 cups dosa batter', '2 potatoes', '1 onion', 'Mustard seeds', 'Turmeric', 'Oil'], instructions: ['Prepare potato masala.', 'Heat a pan and spread dosa batter.', 'Add masala and fold the dosa.'] },
  { id: '2', name: 'Veg Fried Rice', category: 'Lunch', time: 20, servings: 2, calories: 350, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700', ingredients: ['2 cups cooked rice', '1 carrot', 'Beans', 'Soy sauce', 'Pepper'], instructions: ['Chop the vegetables.', 'Stir-fry vegetables in a hot pan.', 'Add rice, seasoning and mix well.'] },
  { id: '3', name: 'Margherita Pizza', category: 'Italian', time: 35, servings: 2, calories: 420, difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700', ingredients: ['Pizza base', 'Tomato sauce', 'Mozzarella', 'Basil'], instructions: ['Spread sauce on the base.', 'Add cheese and basil.', 'Bake until golden and crisp.'] },
  { id: '4', name: 'Fresh Garden Salad', category: 'Healthy', time: 10, servings: 2, calories: 150, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700', ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Olive oil', 'Lemon'], instructions: ['Wash and chop vegetables.', 'Mix in a bowl.', 'Dress with lemon and olive oil.'] },
  { id: '5', name: 'Chocolate Cake', category: 'Desserts', time: 50, servings: 6, calories: 380, difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700', ingredients: ['Flour', 'Cocoa powder', 'Sugar', 'Eggs', 'Milk'], instructions: ['Mix the dry ingredients.', 'Add wet ingredients and mix.', 'Bake until cooked through.'] },
  { id: '6', name: 'Paneer Butter Masala', category: 'Indian', time: 30, servings: 3, calories: 390, difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700', ingredients: ['Paneer', 'Tomatoes', 'Cream', 'Butter', 'Indian spices'], instructions: ['Prepare the tomato gravy.', 'Add spices and simmer.', 'Add paneer and cream.'] },
  { id: '7', name: 'Banana Smoothie', category: 'Breakfast', time: 5, servings: 1, calories: 210, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700', ingredients: ['1 banana', '1 cup milk', 'Honey', 'Ice'], instructions: ['Add all ingredients to a blender.', 'Blend until smooth.', 'Serve chilled.'] },
  { id: '8', name: 'Crispy French Fries', category: 'Snacks', time: 25, servings: 2, calories: 290, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700', ingredients: ['3 potatoes', 'Oil', 'Salt', 'Pepper'], instructions: ['Cut potatoes into strips.', 'Soak and dry thoroughly.', 'Cook until golden and season.'] },
  { id: '9', name: 'Vegan Chickpea Curry', category: 'Vegan', time: 30, servings: 3, calories: 310, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=700', ingredients: ['Chickpeas', 'Tomatoes', 'Onion', 'Coconut milk', 'Spices'], instructions: ['Cook onion and spices.', 'Add tomatoes and chickpeas.', 'Pour in coconut milk and simmer.'] },
  { id: '10', name: 'Grilled Vegetable Sandwich', category: 'Vegetarian', time: 15, servings: 2, calories: 270, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700', ingredients: ['Bread', 'Bell pepper', 'Tomato', 'Cheese', 'Butter'], instructions: ['Slice the vegetables.', 'Layer them between bread slices.', 'Grill until crisp and golden.'] },
  { id: '11', name: 'Lemon Rice', category: 'Lunch', time: 15, servings: 2, calories: 280, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700', ingredients: ['Cooked rice', 'Lemon', 'Mustard seeds', 'Peanuts', 'Turmeric'], instructions: ['Temper mustard seeds and peanuts.', 'Add turmeric and rice.', 'Finish with fresh lemon juice.'] },
  { id: '12', name: 'Vegetable Soup', category: 'Dinner', time: 25, servings: 3, calories: 180, difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700', ingredients: ['Carrot', 'Beans', 'Onion', 'Vegetable stock', 'Pepper'], instructions: ['Chop the vegetables.', 'Simmer in vegetable stock.', 'Season and serve warm.'] }
];

const GREEN = '#26734D';
const BG = '#F7F7F2';

export default function App() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState('All');
  const [screen, setScreen] = useState('home');
  const [selected, setSelected] = useState(null);
  const [returnScreen, setReturnScreen] = useState('home');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '', category: 'Dinner', image: '',
    ingredients: '', instructions: '',
    time: '20', servings: '2', calories: '300',
    difficulty: 'Easy'
  });

  const myRecipes = recipes.filter(r => r.isMine);
  const visibleRecipes = category === 'Favorites'
    ? recipes.filter(r => favorites.includes(r.id))
    : category === 'My Food' || category === 'My Recipes'
      ? myRecipes
      : recipes.filter(r => category === 'All' || r.category === category);

  function openDetails(recipe, from = screen) {
    setSelected(recipe);
    setReturnScreen(from);
    setScreen('details');
  }

  function toggleFavorite(id) {
    setFavorites(old =>
      old.includes(id) ? old.filter(x => x !== id) : [...old, id]
    );
  }

  function startNewRecipe() {
    setEditingId(null);
    setForm({
      name: '', category: 'Dinner', image: '',
      ingredients: '', instructions: '',
      time: '20', servings: '2', calories: '300',
      difficulty: 'Easy'
    });
    setScreen('form');
  }

  function startEdit(recipe) {
    setEditingId(recipe.id);
    setForm({
      name: recipe.name,
      category: recipe.category,
      image: recipe.image || '',
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
      time: String(recipe.time),
      servings: String(recipe.servings),
      calories: String(recipe.calories),
      difficulty: recipe.difficulty
    });
    setScreen('form');
  }

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Allow photo library access to select an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setForm(old => ({ ...old, image: result.assets[0].uri }));
    }
  }

  function saveRecipe() {
    if (!form.name.trim() || !form.ingredients.trim() || !form.instructions.trim()) {
      Alert.alert('Missing information', 'Enter the recipe name, ingredients and instructions.');
      return;
    }

    const recipe = {
      id: editingId || String(Date.now()),
      name: form.name.trim(),
      category: form.category,
      image: form.image.trim(),
      ingredients: form.ingredients.split('\n').map(x => x.trim()).filter(Boolean),
      instructions: form.instructions.split('\n').map(x => x.trim()).filter(Boolean),
      time: Number(form.time) || 0,
      servings: Number(form.servings) || 1,
      calories: Number(form.calories) || 0,
      difficulty: form.difficulty,
      isMine: true
    };

    setRecipes(old => editingId
      ? old.map(r => r.id === editingId ? { ...r, ...recipe } : r)
      : [recipe, ...old]
    );
    setCategory('My Recipes');
    setScreen('home');
    Alert.alert('Success', editingId ? 'Recipe updated!' : 'Recipe saved to My Recipes!');
  }

  function deleteRecipe(recipe) {
    Alert.alert('Delete recipe?', `Delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => {
          setRecipes(old => old.filter(r => r.id !== recipe.id));
          setFavorites(old => old.filter(id => id !== recipe.id));
          setScreen('home');
        }
      }
    ]);
  }

  function goBack() {
    if (screen === 'details') {
      setScreen(returnScreen);
    } else {
      setScreen('home');
    }
  }

  function field(key, placeholder, multiline = false, keyboardType = 'default') {
    return (
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={form[key]}
        onChangeText={value => setForm(old => ({ ...old, [key]: value }))}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    );
  }

  function button(label, onPress, secondary = false) {
    return (
      <Pressable onPress={onPress} style={[styles.button, secondary && styles.secondaryButton]}>
        <Text style={[styles.buttonText, secondary && styles.secondaryButtonText]}>{label}</Text>
      </Pressable>
    );
  }

  function recipeCard(recipe) {
    return (
      <Pressable key={recipe.id} style={styles.card} onPress={() => openDetails(recipe, screen)}>
        {recipe.image ? (
          <Image source={{ uri: recipe.image }} style={styles.cardImage} />
        ) : (
          <View style={[styles.cardImage, styles.imagePlaceholder]}>
            <Text style={{ fontSize: 35 }}>🍲</Text>
          </View>
        )}
        <Pressable style={styles.heart} onPress={() => toggleFavorite(recipe.id)}>
          <Text style={{ fontSize: 22 }}>{favorites.includes(recipe.id) ? '❤️' : '🤍'}</Text>
        </Pressable>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{recipe.name}</Text>
          <Text style={styles.muted}>{recipe.time} min · {recipe.difficulty}</Text>
          <Text style={styles.categoryLabel}>{recipe.category}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <View style={styles.header}>
        {screen !== 'home' ? (
          <Pressable onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>‹ Back</Text>
          </Pressable>
        ) : (
          <Text style={styles.logo}>🥗 Foodie</Text>
        )}
        <Pressable onPress={() => { setCategory('Favorites'); setScreen('home'); }}>
          <Text style={styles.headerFavorite}>♥ Favorites</Text>
        </Pressable>
      </View>

      {screen === 'home' && (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Discover deliciousness</Text>
          <Text style={styles.subtitle}>Find your next favorite meal.</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {CATEGORIES.map(item => (
              <Pressable
                key={item}
                onPress={() => setCategory(item)}
                style={[styles.chip, category === item && styles.chipActive]}
              >
                <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>
              {category === 'My Food' ? 'My Food' : category === 'All' ? 'Popular Recipes' : category}
            </Text>
            <Text style={styles.muted}>{visibleRecipes.length} recipes</Text>
          </View>

          {category === 'My Food' && (
            <View style={styles.myFoodPanel}>
              <Text style={styles.sectionTitle}>Your kitchen</Text>
              <Text style={styles.muted}>Create and manage your own recipes.</Text>
              {button('＋ Add New Recipe', startNewRecipe)}
              {button('View My Recipes', () => setCategory('My Recipes'), true)}
            </View>
          )}

          {category === 'My Recipes' && (
            <View style={styles.myFoodPanel}>
              {button('＋ Add New Recipe', startNewRecipe)}
            </View>
          )}

          {category === 'Favorites' && favorites.length === 0 && (
            <Text style={styles.empty}>No favorites yet. Tap 🤍 on a recipe to save it.</Text>
          )}

          <View style={styles.grid}>
            {visibleRecipes.map(recipeCard)}
          </View>
        </ScrollView>
      )}

      {screen === 'details' && selected && (
        <ScrollView contentContainerStyle={styles.content}>
          {selected.image ? (
            <Image source={{ uri: selected.image }} style={styles.heroImage} />
          ) : (
            <View style={[styles.heroImage, styles.imagePlaceholder]}>
              <Text style={{ fontSize: 55 }}>🍲</Text>
            </View>
          )}
          <Text style={styles.heading}>{selected.name}</Text>
          <Text style={styles.subtitle}>{selected.category}</Text>
          <View style={styles.stats}>
            <View style={styles.stat}><Text style={styles.statNumber}>⏱ {selected.time}</Text><Text style={styles.muted}>Minutes</Text></View>
            <View style={styles.stat}><Text style={styles.statNumber}>🍽 {selected.servings}</Text><Text style={styles.muted}>Servings</Text></View>
            <View style={styles.stat}><Text style={styles.statNumber}>🔥 {selected.calories}</Text><Text style={styles.muted}>Calories</Text></View>
          </View>
          <Text style={styles.infoLine}>Difficulty: {selected.difficulty}</Text>
          {button(favorites.includes(selected.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites', () => toggleFavorite(selected.id), true)}

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {selected.ingredients.map((item, i) => (
            <Text key={i} style={styles.listItem}>•  {item}</Text>
          ))}

          <Text style={styles.sectionTitle}>Instructions</Text>
          {selected.instructions.map((item, i) => (
            <View key={i} style={styles.step}>
              <Text style={styles.stepNumber}>{i + 1}</Text>
              <Text style={styles.stepText}>{item}</Text>
            </View>
          ))}

          {selected.isMine && (
            <View style={styles.actionRow}>
              {button('✏️ Edit', () => startEdit(selected))}
              {button('🗑 Delete', () => deleteRecipe(selected), true)}
            </View>
          )}
        </ScrollView>
      )}

      {screen === 'form' && (
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>{editingId ? 'Edit Recipe' : 'Add New Recipe'}</Text>
          <Text style={styles.label}>Recipe name *</Text>
          {field('name', 'e.g. Homemade pasta')}
          <Text style={styles.label}>Recipe category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.filter(c => !['All', 'My Food', 'My Recipes', 'Favorites'].includes(c)).map(c => (
              <Pressable key={c} onPress={() => setForm(old => ({ ...old, category: c }))} style={[styles.chip, form.category === c && styles.chipActive]}>
                <Text style={[styles.chipText, form.category === c && styles.chipTextActive]}>{c}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.label}>Recipe image</Text>
          {form.image ? <Image source={{ uri: form.image }} style={styles.uploadPreview} /> : null}
          {button('📷 Choose Image from Device', pickImage, true)}
          {field('image', 'Or paste an image URL (optional)')}

          <Text style={styles.label}>Ingredients * (one per line)</Text>
          {field('ingredients', '2 tomatoes\n1 onion\n1 tsp salt', true)}
          <Text style={styles.label}>Step-by-step instructions * (one step per line)</Text>
          {field('instructions', 'Chop the vegetables.\nHeat the pan.\nCook and serve.', true)}

          <Text style={styles.label}>Preparation time (minutes)</Text>
          {field('time', '20', false, 'numeric')}
          <Text style={styles.label}>Number of servings</Text>
          {field('servings', '2', false, 'numeric')}
          <Text style={styles.label}>Calories per serving</Text>
          {field('calories', '300', false, 'numeric')}
          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.actionRow}>
            {['Easy', 'Medium', 'Hard'].map(d => (
              <Pressable key={d} onPress={() => setForm(old => ({ ...old, difficulty: d }))} style={[styles.chip, form.difficulty === d && styles.chipActive]}>
                <Text style={[styles.chipText, form.difficulty === d && styles.chipTextActive]}>{d}</Text>
              </Pressable>
            ))}
          </View>

          {button('Save Recipe', saveRecipe)}
          {button('Cancel', goBack, true)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14, backgroundColor: BG },
  logo: { fontSize: 25, fontWeight: '800', color: GREEN },
  headerFavorite: { fontSize: 15, color: GREEN, fontWeight: '700' },
  backButton: { paddingVertical: 5, paddingRight: 15 },
  backText: { color: GREEN, fontSize: 17, fontWeight: '700' },
  content: { padding: 18, paddingBottom: 45 },
  heading: { fontSize: 27, fontWeight: '800', color: '#222D25', marginTop: 8 },
  subtitle: { color: '#70786F', fontSize: 15, marginTop: 5, marginBottom: 15 },
  categoryScroll: { marginTop: 18, marginBottom: 20, flexGrow: 0 },
  chip: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 24, backgroundColor: '#E8EAE2', marginRight: 8, marginBottom: 5 },
  chipActive: { backgroundColor: GREEN },
  chipText: { color: '#48544B', fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 21, fontWeight: '800', color: '#27362B', marginTop: 22, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 17, overflow: 'hidden', marginBottom: 15, elevation: 2 },
  cardImage: { width: '100%', height: 125, backgroundColor: '#E8EAE2' },
  imagePlaceholder: { justifyContent: 'center', alignItems: 'center' },
  heart: { position: 'absolute', top: 8, right: 8, backgroundColor: '#FFFFFFE8', borderRadius: 20, padding: 5 },
  cardBody: { padding: 11 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#263329', marginBottom: 5 },
  muted: { fontSize: 12, color: '#788078' },
  categoryLabel: { fontSize: 11, color: GREEN, marginTop: 8, fontWeight: '700' },
  heroImage: { width: '100%', height: 235, borderRadius: 18, backgroundColor: '#E8EAE2' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#E8EEE5', borderRadius: 15, padding: 14, marginVertical: 12 },
  stat: { alignItems: 'center', gap: 5 },
  statNumber: { fontWeight: '800', color: GREEN, fontSize: 15 },
  infoLine: { color: '#465047', fontWeight: '700', marginVertical: 5 },
  listItem: { fontSize: 15, color: '#424A43', paddingVertical: 7, lineHeight: 22 },
  step: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14, gap: 12 },
  stepNumber: { backgroundColor: GREEN, color: 'white', overflow: 'hidden', borderRadius: 18, width: 30, height: 30, textAlign: 'center', textAlignVertical: 'center', paddingTop: 5, fontWeight: '800' },
  stepText: { flex: 1, color: '#424A43', fontSize: 15, lineHeight: 22, paddingTop: 3 },
  button: { backgroundColor: GREEN, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginVertical: 6, flex: 1 },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  secondaryButton: { backgroundColor: '#E8EEE5', borderWidth: 1, borderColor: '#D5DFD3' },
  secondaryButtonText: { color: GREEN },
  actionRow: { flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 8 },
  myFoodPanel: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 16 },
  empty: { textAlign: 'center', color: '#70786F', marginVertical: 30, lineHeight: 22 },
  label: { color: '#344438', fontWeight: '700', marginTop: 17, marginBottom: 7, fontSize: 14 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DDE2D8', borderRadius: 11, paddingHorizontal: 13, paddingVertical: 12, color: '#222D25', fontSize: 15, minHeight: 46 },
  multiline: { minHeight: 105, textAlignVertical: 'top' },
  uploadPreview: { width: '100%', height: 170, borderRadius: 13, marginBottom: 8 }
});
