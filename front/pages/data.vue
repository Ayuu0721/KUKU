<template>
  <v-container id="data" class="px-6">
    <v-row>
      <v-col>
        <v-card id="today-accuracy" class="rounded-lg content" elevation="0">
          <v-card-title class="px-2"> 今日の正解率 </v-card-title>
          <p>{{ isNaN(todayAccuracyAvg) ? 0 : todayAccuracyAvg }}%</p>
        </v-card>
      </v-col>
      <v-col>
        <v-card id="today-play" class="rounded-lg content" elevation="0">
          <v-card-title class="px-2"> 今日のプレイ </v-card-title>
          <p>{{ todayPlay }}回</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card id="today-score" class="rounded-lg content" elevation="0">
          <v-card-title class="px-2"> 今日のスコア </v-card-title>
          <div v-if="todayPlay !== 0" class="pa-3">
            <v-sparkline
              :value="todayScores"
              auto-draw
              smooth
              color="secondary"
            />
          </div>
          <p v-else id="no-play">
            今日はまだプレイしていません！<br />KUKUをプレイしましょう！
          </p>
        </v-card>
      </v-col>
    </v-row>
    <v-row id="divider" />
    <v-row>
      <v-col class="pt-0">
        <v-card id="today-accuracy" class="rounded-lg content" elevation="0">
          <v-card-title class="px-2"> 通算正解率 </v-card-title>
          <p>{{ isNaN(accuracyAvg) ? 0 : accuracyAvg }}%</p>
        </v-card>
      </v-col>
      <v-col class="pt-0">
        <v-card id="today-play" class="rounded-lg content" elevation="0">
          <v-card-title class="px-2"> 通算プレイ </v-card-title>
          <p>{{ sumPlay }}回</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-6">
        <v-card id="today-score" class="rounded-lg content" elevation="0">
          <v-card-title class="px-2"> 通算スコア </v-card-title>
          <div v-if="sumPlay !== 0" class="pa-3">
            <v-sparkline
              :value="sumScores"
              auto-draw
              smooth
              color="secondary"
            />
          </div>
          <p v-else id="no-play">
            まだプレイしていません！<br />KUKUをプレイしましょう！
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      todayScores: [],
      sumScores: [],
      today: '',
      todayPlay: 0,
      sumPlay: 0,
      todayAccuracyAvg: 0,
      accuracyAvg: 0,
    }
  },

  created() {
    this.$store.dispatch('auth/onAuth')
  },

  mounted() {
    this.getRecord()
    this.treatmentScore()
  },

  methods: {
    getRecord() {
      this.$nuxt.$loading.start()
      this.$store.dispatch('showScore/getScoreFromApi')
      this.$nuxt.$loading.finish()
    },
    treatmentScore() {
      this.$nuxt.$loading.start()
      const dt = new Date()
      const YYYY = dt.getFullYear()
      const MM = ('0' + (dt.getMonth() + 1)).slice(-2)
      const DD = ('0' + dt.getDate()).slice(-2)
      this.today = YYYY + '-' + MM + '-' + DD

      const array = this.$store.getters['showScore/getScore']
      let sumAccuracy = 0
      let todayAccuracy = 0
      let todayLength = 0

      for (let i = 0; i < array.length; i++) {
        sumAccuracy += array[i].accuracy * 100
        this.sumScores.push(array[i].number_of_correct_answer)
        if (array[i].created_at.substr(0, 10) === this.today) {
          todayLength += 1
          todayAccuracy += array[i].accuracy * 100
          this.todayScores.push(array[i].number_of_correct_answer)
        }
      }
      this.sumPlay = array.length
      this.accuracyAvg = Math.trunc(sumAccuracy / array.length)
      this.todayAccuracyAvg = Math.trunc(todayAccuracy / todayLength)
      this.todayPlay = this.todayScores.length
      this.$nuxt.$loading.finish()
    },
  },
}
</script>

<style lang="scss" scoped>
#data {
  margin-top: 88px;
  @media screen and (min-width: 960px) {
    width: 40vw;
  }
}
#today-accuracy {
  text-align: center;
  p {
    font-size: 3rem;
    margin: 0;
  }
}
#today-play {
  text-align: center;
  p {
    font-size: 3rem;
    margin: 0;
  }
}
#today-score {
  text-align: center;
  p {
    font-size: 3rem;
    margin: 0;
  }
  #no-play {
    font-size: 1.1rem;
    padding: 0 8px 16px 8px;
  }
}
#divider {
  border: 0.5px var(--v-cLight-darken2) solid;
  margin: 16px 0;
}
</style>
