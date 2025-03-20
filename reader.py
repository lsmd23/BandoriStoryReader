from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)

LANGUAGES = {
    0: "日本語",
    1: "English",
    2: "繁體中文",
    3: "简体中文",
    4: "한국어"
}

CHARACTER_ICONS = {i: f"chara_icon_{i}.png" for i in range(1, 41)}

def load_database():
    with open('database.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def load_story_content(scenario_id):
    try:
        # Find the event number from scenario_id (e.g., "event01-01" -> "1")
        event_num = int(scenario_id.split('event')[1].split('-')[0])
        story_path = os.path.join('assets', f'event{event_num}', f'Scenario{scenario_id}.json')
        
        with open(story_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, ValueError, KeyError):
        return None

@app.route('/')
def index():
    return render_template('index.html', languages=LANGUAGES)

@app.route('/get_events')
def get_events():
    data = load_database()
    main_lang_idx = int(request.args.get('main_lang', 0))
    events = []
    for event_id, event_data in data.items():
        events.append({
            'id': event_id,
            'name': event_data['eventName'][main_lang_idx]
        })
    return jsonify(events)

@app.route('/get_story')
def get_story():
    data = load_database()
    event_id = request.args.get('event_id')
    main_lang_idx = int(request.args.get('main_lang', 0))
    sub_lang_idx = request.args.get('sub_lang')
    sub_lang_idx = int(sub_lang_idx) if sub_lang_idx else None
    
    if event_id not in data:
        return jsonify({'error': 'Event not found'})
    
    event_data = data[event_id]
    stories = []
    for story in event_data['stories']:
        story_data = {
            'caption': story['caption'][main_lang_idx],
            'title': story['title'][main_lang_idx],
            'synopsis': story['synopsis'][main_lang_idx],
            'scenarioId': story.get('scenarioId', '')
        }
        
        # Load detailed story content if available
        story_content = load_story_content(story['scenarioId']) if 'scenarioId' in story else None
        if story_content:
            story_data['dialogues'] = []
            # Initialize a counter for specialEffectData
            special_effect_index = 0
            # Process snippets in order
            for snippet in story_content['Base']['snippets']:
                if snippet['actionType'] == 6:
                    # Handle specialEffectData
                    effects_to_display = []
                    try:
                        effect = story_content['Base']['specialEffectData'][special_effect_index]
                        if effect['effectType'] == 8:
                            effects_to_display.append(f'<div class="centered-text">{effect["stringVal"]}</div>')
                        special_effect_index += 1
                    except IndexError:
                        pass
                    if effects_to_display:
                        story_data['dialogues'].append({
                            'icon': '',
                            'speaker': '',
                            'text': '<br>'.join(effects_to_display),
                            'centered': True
                        })
                elif snippet['actionType'] == 1:
                    # Handle talkData
                    reference_index = snippet['referenceIndex']
                    talk = story_content['Base']['talkData'][reference_index]
                    character_id = talk['talkCharacters'][0]['characterId'] if talk['talkCharacters'] else 0
                    icon_path = CHARACTER_ICONS.get(character_id)
                    dialogue = {
                        'icon': f'/static/icon/{icon_path}' if icon_path else '',
                        'speaker': talk.get('windowDisplayName', ''),
                        'text': talk.get('body', '')
                    }
                    story_data['dialogues'].append(dialogue)
        
        if sub_lang_idx is not None:
            story_data.update({
                'sub_caption': story['caption'][sub_lang_idx],
                'sub_title': story['title'][sub_lang_idx],
                'sub_synopsis': story['synopsis'][sub_lang_idx],
            })
        stories.append(story_data)
    return jsonify(stories)

if __name__ == '__main__':
    app.run(debug=True)